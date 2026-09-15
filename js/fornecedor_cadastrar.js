const resposta = document.getElementById('resposta');
const btn_cadastrar = document.getElementById('btn_cadastrar');

btn_cadastrar.addEventListener('click', async (e) => {
    e.preventDefault();

    const nomeFornecedor = document.getElementById('nomeFornecedor').value;
    const cnpj = document.getElementById('cnpj').value;
    const categoriaFornecida = document.getElementById('categoriaFornecida').value;
    const prazoEntregaDias = document.getElementById('prazoEntregaDias').value;

    const dados = {
        nomeFornecedor: nomeFornecedor,
        cnpj: cnpj,
        categoriaFornecida: categoriaFornecida,
        prazoEntregaDias: prazoEntregaDias === '' ? undefined : Number(prazoEntregaDias)
    };

    fetch(`${API_BASE_URL}/fornecedor`, {
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
            console.error('Erro ao cadastrar Fornecedor', err);
            resposta.innerHTML = '<p>Não foi possível conectar ao servidor.</p>';
        });
});
