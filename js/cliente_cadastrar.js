const resposta = document.getElementById('resposta');
const btn_cadastrar = document.getElementById('btn_cadastrar');

btn_cadastrar.addEventListener('click', async (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const senha = document.getElementById('senha').value;
    const tipoCliente = document.getElementById('tipoCliente').value;

    const dados = {
        nome: nome,
        email: email,
        telefone: telefone,
        senha: senha,
        tipoCliente: tipoCliente
    };

    fetch(`${API_BASE_URL}/cliente`, {
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
            console.error('Erro ao cadastrar Cliente', err);
            resposta.innerHTML = '<p>Não foi possível conectar ao servidor.</p>';
        });
});
