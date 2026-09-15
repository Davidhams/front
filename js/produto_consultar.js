const resposta = document.getElementById('resposta');
const resultado = document.getElementById('resultado');
const btn_consultar = document.getElementById('btn_consultar');

btn_consultar.addEventListener('click', (e) => {
    e.preventDefault();
    const cod = document.getElementById('codBusca').value;

    fetch(`${API_BASE_URL}/produto/${cod}`, { headers: headersAutenticados() })
        .then(async (res) => {
            const item = await res.json();
            if (!res.ok) {
                resultado.innerHTML = '';
                resposta.innerHTML = `<p>${item.message}</p>`;
                return;
            }
            resposta.innerHTML = '';
            resultado.innerHTML = `
        <p><strong>codProduto:</strong> ${item.codProduto}</p>
        <p><strong>Nome do Produto:</strong> ${item.nomeProduto !== undefined && item.nomeProduto !== null ? item.nomeProduto : ''}</p>
        <p><strong>Categoria:</strong> ${item.categoria !== undefined && item.categoria !== null ? item.categoria : ''}</p>
        <p><strong>Preço Unitário:</strong> ${item.precoUnitario !== undefined && item.precoUnitario !== null ? item.precoUnitario : ''}</p>
        <p><strong>Quantidade em Estoque:</strong> ${item.quantidadeEstoque !== undefined && item.quantidadeEstoque !== null ? item.quantidadeEstoque : ''}</p>
        <p><strong>Peso (Kg):</strong> ${item.pesoKg !== undefined && item.pesoKg !== null ? item.pesoKg : ''}</p>
        <p><strong>Exige Montagem?:</strong> ${item.exigeMontagem !== undefined && item.exigeMontagem !== null ? item.exigeMontagem : ''}</p>
        ${item.imagemBase64 ? `<p>Imagem do Produto:</p><img class="produto_imagem_preview" src="${item.imagemBase64}">` : ''}
            `;
        })
        .catch((err) => {
            console.error('Erro ao consultar Produto', err);
            resposta.innerHTML = '<p>Não foi possível conectar ao servidor.</p>';
        });
});
