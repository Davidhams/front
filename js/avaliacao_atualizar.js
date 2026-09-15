const resposta = document.getElementById('resposta');
const btn_buscar = document.getElementById('btn_buscar');
const btn_atualizar = document.getElementById('btn_atualizar');

btn_buscar.addEventListener('click', () => {
    const cod = document.getElementById('codBusca').value;

    fetch(`${API_BASE_URL}/avaliacao/${cod}`, { headers: headersAutenticados() })
        .then(async (res) => {
            const item = await res.json();
            if (!res.ok) {
                resposta.innerHTML = `<p>${item.message}</p>`;
                return;
            }
            resposta.innerHTML = '';
        if (item.idCliente !== undefined && item.idCliente !== null) document.getElementById('idCliente').value = item.idCliente;
        if (item.idProduto !== undefined && item.idProduto !== null) document.getElementById('idProduto').value = item.idProduto;
        if (item.nota !== undefined && item.nota !== null) document.getElementById('nota').value = item.nota;
        if (item.comentario !== undefined && item.comentario !== null) document.getElementById('comentario').value = item.comentario;
        if (item.dataAvaliacao !== undefined && item.dataAvaliacao !== null) document.getElementById('dataAvaliacao').value = item.dataAvaliacao;
        })
        .catch((err) => {
            console.error('Erro ao buscar Avaliação', err);
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
    const idProduto = document.getElementById('idProduto').value;
    const nota = document.getElementById('nota').value;
    const comentario = document.getElementById('comentario').value;
    const dataAvaliacao = document.getElementById('dataAvaliacao').value;

    const dados = {
        idCliente: idCliente === '' ? undefined : Number(idCliente),
        idProduto: idProduto === '' ? undefined : Number(idProduto),
        nota: nota === '' ? undefined : Number(nota),
        comentario: comentario,
        dataAvaliacao: dataAvaliacao
    };

    fetch(`${API_BASE_URL}/avaliacao/${cod}`, {
        method: 'PUT',
        headers: headersAutenticados(),
        body: JSON.stringify(dados)
    })
        .then(async (res) => {
            const corpo = await res.json();
            resposta.innerHTML = `<p>${corpo.message}</p>`;
        })
        .catch((err) => {
            console.error('Erro ao atualizar Avaliação', err);
            resposta.innerHTML = '<p>Não foi possível conectar ao servidor.</p>';
        });
});
