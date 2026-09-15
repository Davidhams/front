const resposta = document.getElementById('resposta');
const btn_cadastrar = document.getElementById('btn_cadastrar');

btn_cadastrar.addEventListener('click', async (e) => {
    e.preventDefault();

    const idKit = document.getElementById('idKit').value;
    const idProduto = document.getElementById('idProduto').value;
    const quantidade = document.getElementById('quantidade').value;

    const dados = {
        idKit: idKit === '' ? undefined : Number(idKit),
        idProduto: idProduto === '' ? undefined : Number(idProduto),
        quantidade: quantidade === '' ? undefined : Number(quantidade)
    };

    fetch(`${API_BASE_URL}/item-kit`, {
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
            console.error('Erro ao cadastrar Item do Kit', err);
            resposta.innerHTML = '<p>Não foi possível conectar ao servidor.</p>';
        });
});
