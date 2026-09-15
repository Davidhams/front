const resposta = document.getElementById('resposta');
const resultado = document.getElementById('resultado');
const btn_consultar = document.getElementById('btn_consultar');

btn_consultar.addEventListener('click', (e) => {
    e.preventDefault();
    const cod = document.getElementById('codBusca').value;

    fetch(`${API_BASE_URL}/avaliacao/${cod}`, { headers: headersAutenticados() })
        .then(async (res) => {
            const item = await res.json();
            if (!res.ok) {
                resultado.innerHTML = '';
                resposta.innerHTML = `<p>${item.message}</p>`;
                return;
            }
            resposta.innerHTML = '';
            resultado.innerHTML = `
        <p><strong>codAvaliacao:</strong> ${item.codAvaliacao}</p>
        <p><strong>Código do Cliente:</strong> ${item.idCliente !== undefined && item.idCliente !== null ? item.idCliente : ''}</p>
        <p><strong>Código do Produto:</strong> ${item.idProduto !== undefined && item.idProduto !== null ? item.idProduto : ''}</p>
        <p><strong>Nota (1 a 5):</strong> ${item.nota !== undefined && item.nota !== null ? item.nota : ''}</p>
        <p><strong>Comentário:</strong> ${item.comentario !== undefined && item.comentario !== null ? item.comentario : ''}</p>
        <p><strong>Data da Avaliação:</strong> ${item.dataAvaliacao !== undefined && item.dataAvaliacao !== null ? item.dataAvaliacao : ''}</p>
            `;
        })
        .catch((err) => {
            console.error('Erro ao consultar Avaliação', err);
            resposta.innerHTML = '<p>Não foi possível conectar ao servidor.</p>';
        });
});
