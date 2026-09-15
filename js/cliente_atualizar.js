const resposta = document.getElementById('resposta');
const btn_buscar = document.getElementById('btn_buscar');
const btn_atualizar = document.getElementById('btn_atualizar');

btn_buscar.addEventListener('click', () => {
    const cod = document.getElementById('codBusca').value;

    fetch(`${API_BASE_URL}/cliente/${cod}`, { headers: headersAutenticados() })
        .then(async (res) => {
            const item = await res.json();
            if (!res.ok) {
                resposta.innerHTML = `<p>${item.message}</p>`;
                return;
            }
            resposta.innerHTML = '';
        if (item.nome !== undefined && item.nome !== null) document.getElementById('nome').value = item.nome;
        if (item.email !== undefined && item.email !== null) document.getElementById('email').value = item.email;
        if (item.telefone !== undefined && item.telefone !== null) document.getElementById('telefone').value = item.telefone;
        document.getElementById('senha').value = '';
        document.getElementById('tipoCliente').value = String(item.tipoCliente);
        })
        .catch((err) => {
            console.error('Erro ao buscar Cliente', err);
            resposta.innerHTML = '<p>Não foi possível conectar ao servidor.</p>';
        });
});

btn_atualizar.addEventListener('click', async (e) => {
    e.preventDefault();
    const cod = document.getElementById('codBusca').value;
    if (!cod) {
        resposta.innerHTML = '<p>Busque um registro antes de atualizar.</p>';
        return;
    }

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const senha = document.getElementById('senha').value;
    const tipoCliente = document.getElementById('tipoCliente').value;

    const dados = {
        nome: nome,
        email: email,
        telefone: telefone,
        ...(senha ? { senha } : {}),
        tipoCliente: tipoCliente
    };

    fetch(`${API_BASE_URL}/cliente/${cod}`, {
        method: 'PUT',
        headers: headersAutenticados(),
        body: JSON.stringify(dados)
    })
        .then(async (res) => {
            const corpo = await res.json();
            resposta.innerHTML = `<p>${corpo.message}</p>`;
        })
        .catch((err) => {
            console.error('Erro ao atualizar Cliente', err);
            resposta.innerHTML = '<p>Não foi possível conectar ao servidor.</p>';
        });
});
