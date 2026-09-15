const resposta = document.getElementById('resposta');
const btn_entrar = document.getElementById('btn_entrar');

btn_entrar.addEventListener('click', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    fetch(`${API_BASE_URL}/cliente/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
    })
        .then(async (res) => {
            const dados = await res.json();
            if (!res.ok) {
                resposta.innerHTML = `<p>${dados.message}</p>`;
                return;
            }
            salvarSessao(dados.token, dados.cliente);
            window.location.href = './produtos_catalogo.html';
        })
        .catch((err) => {
            console.error('Erro ao fazer login', err);
            resposta.innerHTML = '<p>Não foi possível conectar ao servidor.</p>';
        });
});
