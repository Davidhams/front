const resposta = document.getElementById('resposta');
const btn_buscar = document.getElementById('btn_buscar');
const btn_atualizar = document.getElementById('btn_atualizar');

btn_buscar.addEventListener('click', () => {
    const cod = document.getElementById('codBusca').value;

    fetch(`${API_BASE_URL}/kit/${cod}`, { headers: headersAutenticados() })
        .then(async (res) => {
            const item = await res.json();
            if (!res.ok) {
                resposta.innerHTML = `<p>${item.message}</p>`;
                return;
            }
            resposta.innerHTML = '';
        if (item.nomeKit !== undefined && item.nomeKit !== null) document.getElementById('nomeKit').value = item.nomeKit;
        if (item.descricao !== undefined && item.descricao !== null) document.getElementById('descricao').value = item.descricao;
        if (item.precoKit !== undefined && item.precoKit !== null) document.getElementById('precoKit').value = item.precoKit;
        document.getElementById('publicoAlvo').value = String(item.publicoAlvo);
        })
        .catch((err) => {
            console.error('Erro ao buscar Kit Pronto', err);
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

    fetch(`${API_BASE_URL}/kit/${cod}`, {
        method: 'PUT',
        headers: headersAutenticados(),
        body: JSON.stringify(dados)
    })
        .then(async (res) => {
            const corpo = await res.json();
            resposta.innerHTML = `<p>${corpo.message}</p>`;
        })
        .catch((err) => {
            console.error('Erro ao atualizar Kit Pronto', err);
            resposta.innerHTML = '<p>Não foi possível conectar ao servidor.</p>';
        });
});
