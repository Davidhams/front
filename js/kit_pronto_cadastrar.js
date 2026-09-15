const resposta = document.getElementById('resposta');
const btn_cadastrar = document.getElementById('btn_cadastrar');

btn_cadastrar.addEventListener('click', async (e) => {
    e.preventDefault();

    const nomeKit = document.getElementById('nomeKit').value;
    const descricao = document.getElementById('descricao').value;
    const precoKit = document.getElementById('precoKit').value;
    const publicoAlvo = document.getElementById('publicoAlvo').value;

    const dados = {
        nomeKit: nomeKit,
        descricao: descricao,
        precoKit: precoKit === '' ? undefined : Number(precoKit),
        publicoAlvo: publicoAlvo
    };

    fetch(`${API_BASE_URL}/kit`, {
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
            console.error('Erro ao cadastrar Kit Pronto', err);
            resposta.innerHTML = '<p>Não foi possível conectar ao servidor.</p>';
        });
});
