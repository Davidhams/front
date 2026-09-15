const resposta = document.getElementById('resposta');
const btn_buscar = document.getElementById('btn_buscar');
const btn_atualizar = document.getElementById('btn_atualizar');

btn_buscar.addEventListener('click', () => {
    const cod = document.getElementById('codBusca').value;

    fetch(`${API_BASE_URL}/endereco/${cod}`, { headers: headersAutenticados() })
        .then(async (res) => {
            const item = await res.json();
            if (!res.ok) {
                resposta.innerHTML = `<p>${item.message}</p>`;
                return;
            }
            resposta.innerHTML = '';
        if (item.idCliente !== undefined && item.idCliente !== null) document.getElementById('idCliente').value = item.idCliente;
        if (item.condominio !== undefined && item.condominio !== null) document.getElementById('condominio').value = item.condominio;
        if (item.logradouro !== undefined && item.logradouro !== null) document.getElementById('logradouro').value = item.logradouro;
        if (item.numero !== undefined && item.numero !== null) document.getElementById('numero').value = item.numero;
        if (item.cep !== undefined && item.cep !== null) document.getElementById('cep').value = item.cep;
        document.getElementById('proximoBR101').value = String(item.proximoBR101);
        })
        .catch((err) => {
            console.error('Erro ao buscar Endereço', err);
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
    const condominio = document.getElementById('condominio').value;
    const logradouro = document.getElementById('logradouro').value;
    const numero = document.getElementById('numero').value;
    const cep = document.getElementById('cep').value;
    const proximoBR101 = document.getElementById('proximoBR101').value;

    const dados = {
        idCliente: idCliente === '' ? undefined : Number(idCliente),
        condominio: condominio,
        logradouro: logradouro,
        numero: numero,
        cep: cep,
        proximoBR101: proximoBR101 === 'true'
    };

    fetch(`${API_BASE_URL}/endereco/${cod}`, {
        method: 'PUT',
        headers: headersAutenticados(),
        body: JSON.stringify(dados)
    })
        .then(async (res) => {
            const corpo = await res.json();
            resposta.innerHTML = `<p>${corpo.message}</p>`;
        })
        .catch((err) => {
            console.error('Erro ao atualizar Endereço', err);
            resposta.innerHTML = '<p>Não foi possível conectar ao servidor.</p>';
        });
});
