const resposta = document.getElementById('resposta');
const btn_buscar = document.getElementById('btn_buscar');
const btn_atualizar = document.getElementById('btn_atualizar');

btn_buscar.addEventListener('click', () => {
    const cod = document.getElementById('codBusca').value;

    fetch(`${API_BASE_URL}/entrega/${cod}`, { headers: headersAutenticados() })
        .then(async (res) => {
            const item = await res.json();
            if (!res.ok) {
                resposta.innerHTML = `<p>${item.message}</p>`;
                return;
            }
            resposta.innerHTML = '';
        if (item.idPedido !== undefined && item.idPedido !== null) document.getElementById('idPedido').value = item.idPedido;
        if (item.entregador !== undefined && item.entregador !== null) document.getElementById('entregador').value = item.entregador;
        document.getElementById('localEntrega').value = String(item.localEntrega);
        if (item.dataHoraSaida !== undefined && item.dataHoraSaida !== null) document.getElementById('dataHoraSaida').value = item.dataHoraSaida;
        if (item.dataHoraEntrega !== undefined && item.dataHoraEntrega !== null) document.getElementById('dataHoraEntrega').value = item.dataHoraEntrega;
        })
        .catch((err) => {
            console.error('Erro ao buscar Entrega', err);
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
    const entregador = document.getElementById('entregador').value;
    const localEntrega = document.getElementById('localEntrega').value;
    const dataHoraSaida = document.getElementById('dataHoraSaida').value;
    const dataHoraEntrega = document.getElementById('dataHoraEntrega').value;

    const dados = {
        idPedido: idPedido === '' ? undefined : Number(idPedido),
        entregador: entregador,
        localEntrega: localEntrega,
        dataHoraSaida: dataHoraSaida,
        dataHoraEntrega: dataHoraEntrega
    };

    fetch(`${API_BASE_URL}/entrega/${cod}`, {
        method: 'PUT',
        headers: headersAutenticados(),
        body: JSON.stringify(dados)
    })
        .then(async (res) => {
            const corpo = await res.json();
            resposta.innerHTML = `<p>${corpo.message}</p>`;
        })
        .catch((err) => {
            console.error('Erro ao atualizar Entrega', err);
            resposta.innerHTML = '<p>Não foi possível conectar ao servidor.</p>';
        });
});
