const resposta = document.getElementById('resposta');
const btn_buscar = document.getElementById('btn_buscar');
const btn_atualizar = document.getElementById('btn_atualizar');

btn_buscar.addEventListener('click', () => {
    const cod = document.getElementById('codBusca').value;

    fetch(`${API_BASE_URL}/item-kit/${cod}`, { headers: headersAutenticados() })
        .then(async (res) => {
            const item = await res.json();
            if (!res.ok) {
                resposta.innerHTML = `<p>${item.message}</p>`;
                return;
            }
            resposta.innerHTML = '';
        if (item.idKit !== undefined && item.idKit !== null) document.getElementById('idKit').value = item.idKit;
        if (item.idProduto !== undefined && item.idProduto !== null) document.getElementById('idProduto').value = item.idProduto;
        if (item.quantidade !== undefined && item.quantidade !== null) document.getElementById('quantidade').value = item.quantidade;
        })
        .catch((err) => {
            console.error('Erro ao buscar Item do Kit', err);
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

    const idKit = document.getElementById('idKit').value;
    const idProduto = document.getElementById('idProduto').value;
    const quantidade = document.getElementById('quantidade').value;

    const dados = {
        idKit: idKit === '' ? undefined : Number(idKit),
        idProduto: idProduto === '' ? undefined : Number(idProduto),
        quantidade: quantidade === '' ? undefined : Number(quantidade)
    };

    fetch(`${API_BASE_URL}/item-kit/${cod}`, {
        method: 'PUT',
        headers: headersAutenticados(),
        body: JSON.stringify(dados)
    })
        .then(async (res) => {
            const corpo = await res.json();
            resposta.innerHTML = `<p>${corpo.message}</p>`;
        })
        .catch((err) => {
            console.error('Erro ao atualizar Item do Kit', err);
            resposta.innerHTML = '<p>Não foi possível conectar ao servidor.</p>';
        });
});
