const resposta = document.getElementById('resposta');
const btn_cadastrar = document.getElementById('btn_cadastrar');

btn_cadastrar.addEventListener('click', async (e) => {
    e.preventDefault();

    const nomeProduto = document.getElementById('nomeProduto').value;
    const categoria = document.getElementById('categoria').value;
    const precoUnitario = document.getElementById('precoUnitario').value;
    const quantidadeEstoque = document.getElementById('quantidadeEstoque').value;
    const pesoKg = document.getElementById('pesoKg').value;
    const exigeMontagem = document.getElementById('exigeMontagem').value;

    const imagemInput = document.getElementById('imagemBase64');
    const imagemBase64 = await converterImagemParaBase64(imagemInput);

    const dados = {
        nomeProduto: nomeProduto,
        categoria: categoria,
        precoUnitario: precoUnitario === '' ? undefined : Number(precoUnitario),
        quantidadeEstoque: quantidadeEstoque === '' ? undefined : Number(quantidadeEstoque),
        pesoKg: pesoKg === '' ? undefined : Number(pesoKg),
        exigeMontagem: exigeMontagem === 'true',
        imagemBase64: imagemBase64
    };

    fetch(`${API_BASE_URL}/produto`, {
        method: 'POST',
        headers: headersAutenticados(),
        body: JSON.stringify(dados)
    })
        .then(async (res) => {
            const corpo = await res.json();
            resposta.innerHTML = `<p>${corpo.message}</p>`;
            if (res.ok) {
                document.querySelector('form').reset();
            }
        })
        .catch((err) => {
            console.error('Erro ao cadastrar Produto', err);
            resposta.innerHTML = '<p>Não foi possível conectar ao servidor.</p>';
        });
});
