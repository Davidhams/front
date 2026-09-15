const resposta = document.getElementById('resposta');
const btn_buscar = document.getElementById('btn_buscar');
const btn_atualizar = document.getElementById('btn_atualizar');

btn_buscar.addEventListener('click', () => {
    const cod = document.getElementById('codBusca').value;

    fetch(`${API_BASE_URL}/pedido/${cod}`, { headers: headersAutenticados() })
        .then(async (res) => {
            const item = await res.json();
            if (!res.ok) {
                resposta.innerHTML = `<p>${item.message}</p>`;
                return;
            }
            resposta.innerHTML = '';
        if (item.idCliente !== undefined && item.idCliente !== null) document.getElementById('idCliente').value = item.idCliente;
        if (item.idEndereco !== undefined && item.idEndereco !== null) document.getElementById('idEndereco').value = item.idEndereco;
        if (item.dataPedido !== undefined && item.dataPedido !== null) document.getElementById('dataPedido').value = item.dataPedido;
        if (item.horaPedido !== undefined && item.horaPedido !== null) document.getElementById('horaPedido').value = item.horaPedido;
        document.getElementById('tipoEntrega').value = String(item.tipoEntrega);
        document.getElementById('status').value = String(item.status);
        if (item.valorTotal !== undefined && item.valorTotal !== null) document.getElementById('valorTotal').value = item.valorTotal;
        })
        .catch((err) => {
            console.error('Erro ao buscar Pedido', err);
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

    const idCliente = document.getElementById('idCliente').value;
    const idEndereco = document.getElementById('idEndereco').value;
    const dataPedido = document.getElementById('dataPedido').value;
    const horaPedido = document.getElementById('horaPedido').value;
    const tipoEntrega = document.getElementById('tipoEntrega').value;
    const status = document.getElementById('status').value;
    const valorTotal = document.getElementById('valorTotal').value;

    const dados = {
        idCliente: idCliente === '' ? undefined : Number(idCliente),
        idEndereco: idEndereco === '' ? undefined : Number(idEndereco),
        dataPedido: dataPedido,
        horaPedido: horaPedido,
        tipoEntrega: tipoEntrega,
        status: status,
        valorTotal: valorTotal === '' ? undefined : Number(valorTotal)
    };

    fetch(`${API_BASE_URL}/pedido/${cod}`, {
        method: 'PUT',
        headers: headersAutenticados(),
        body: JSON.stringify(dados)
    })
        .then(async (res) => {
            const corpo = await res.json();
            resposta.innerHTML = `<p>${corpo.message}</p>`;
        })
        .catch((err) => {
            console.error('Erro ao atualizar Pedido', err);
            resposta.innerHTML = '<p>Não foi possível conectar ao servidor.</p>';
        });
});
