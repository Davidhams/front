const resposta = document.getElementById('resposta');
const btn_apagar = document.getElementById('btn_apagar');

btn_apagar.addEventListener('click', (e) => {
    e.preventDefault();
    const cod = document.getElementById('codBusca').value;

    if (!confirm('Tem certeza que deseja apagar este registro?')) return;

    fetch(`${API_BASE_URL}/entrega/${cod}`, {
        method: 'DELETE',
        headers: headersAutenticados()
    })
        .then(async (res) => {
            const corpo = await res.json();
            resposta.innerHTML = `<p>${corpo.message}</p>`;
        })
        .catch((err) => {
            console.error('Erro ao apagar Entrega', err);
            resposta.innerHTML = '<p>Não foi possível conectar ao servidor.</p>';
        });
});
