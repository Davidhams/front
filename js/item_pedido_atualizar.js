const resposta = document.getElementById('resposta');
const btn_buscar = document.getElementById('btn_buscar');
const btn_atualizar = document.getElementById('btn_atualizar');

btn_buscar.addEventListener('click', () => {
    const cod = document.getElementById('codBusca').value;

    fetch(`${API_BASE_URL}/item-pedido/${cod}`, { headers: headersAutenticados() })
        .then(async (res) => {
            const item = await res.json();
            if (!res.ok) {
                resposta.innerHTML = `<p>${item.message}</p>`;
                return;
            }
            resposta.innerHTML = '';
        if (item.idPedido !== undefined && item.idPedido !== null) document.getElementById('idPedido').value = item.idPedido;
        if (item.idProduto !== undefined && item.idProduto !== null) document.getElementById('idProduto').value = item.idProduto;
        if (item.quantidade !== undefined && item.quantidade !== null) document.getElementById('quantidade').value = item.quantidade;
        if (item.precoUnitario !== undefined && item.precoUnitario !== null) document.getElementById('precoUnitario').value = item.precoUnitario;
        if (item.subtotal !== undefined && item.subtotal !== null) document.getElementById('subtotal').value = item.subtotal;
        })
        .catch((err) => {
            console.error('Erro ao buscar Item do Pedido', err);
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

    const idPedido = document.getElementById('idPedido').value;
    const idProduto = document.getElementById('idProduto').value;
    const quantidade = document.getElementById('quantidade').value;
    const precoUnitario = document.getElementById('precoUnitario').value;
    const subtotal = document.getElementById('subtotal').value;

    const dados = {
        idPedido: idPedido === '' ? undefined : Number(idPedido),
        idProduto: idProduto === '' ? undefined : Number(idProduto),
        quantidade: quantidade === '' ? undefined : Number(quantidade),
        precoUnitario: precoUnitario === '' ? undefined : Number(precoUnitario),
        subtotal: subtotal === '' ? undefined : Number(subtotal)
    };

    fetch(`${API_BASE_URL}/item-pedido/${cod}`, {
        method: 'PUT',
        headers: headersAutenticados(),
        body: JSON.stringify(dados)
    })
        .then(async (res) => {
            const corpo = await res.json();
            resposta.innerHTML = `<p>${corpo.message}</p>`;
        })
        .catch((err) => {
            console.error('Erro ao atualizar Item do Pedido', err);
            resposta.innerHTML = '<p>Não foi possível conectar ao servidor.</p>';
        });
});
