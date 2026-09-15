const resposta = document.getElementById('resposta');
const btn_cadastrar = document.getElementById('btn_cadastrar');

btn_cadastrar.addEventListener('click', (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const senha = document.getElementById('senha').value;

    fetch(`${API_BASE_URL}/cliente/registrar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, telefone, senha })
    })
        .then(async (res) => {
            const dados = await res.json();
            resposta.innerHTML = `<p>${dados.message}</p>`;
            if (res.ok) {
                document.querySelector('form').reset();
                setTimeout(() => { window.location.href = './login.html'; }, 1200);
            }
        })
        .catch((err) => {
            console.error('Erro ao cadastrar cliente', err);
            resposta.innerHTML = '<p>Não foi possível conectar ao servidor.</p>';
        });
});
