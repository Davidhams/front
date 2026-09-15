const resposta = document.getElementById('resposta');
const btn_buscar = document.getElementById('btn_buscar');
const btn_atualizar = document.getElementById('btn_atualizar');

btn_buscar.addEventListener('click', () => {
    const cod = document.getElementById('codBusca').value;

    fetch(`${API_BASE_URL}/fornecedor/${cod}`, { headers: headersAutenticados() })
        .then(async (res) => {
            const item = await res.json();
            if (!res.ok) {
                resposta.innerHTML = `<p>${item.message}</p>`;
                return;
            }
            resposta.innerHTML = '';
        if (item.nomeFornecedor !== undefined && item.nomeFornecedor !== null) document.getElementById('nomeFornecedor').value = item.nomeFornecedor;
        if (item.cnpj !== undefined && item.cnpj !== null) document.getElementById('cnpj').value = item.cnpj;
        document.getElementById('categoriaFornecida').value = String(item.categoriaFornecida);
        if (item.prazoEntregaDias !== undefined && item.prazoEntregaDias !== null) document.getElementById('prazoEntregaDias').value = item.prazoEntregaDias;
        })
        .catch((err) => {
            console.error('Erro ao buscar Fornecedor', err);
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

    const nomeFornecedor = document.getElementById('nomeFornecedor').value;
    const cnpj = document.getElementById('cnpj').value;
    const categoriaFornecida = document.getElementById('categoriaFornecida').value;
    const prazoEntregaDias = document.getElementById('prazoEntregaDias').value;

    const dados = {
        nomeFornecedor: nomeFornecedor,
        cnpj: cnpj,
        categoriaFornecida: categoriaFornecida,
        prazoEntregaDias: prazoEntregaDias === '' ? undefined : Number(prazoEntregaDias)
    };

    fetch(`${API_BASE_URL}/fornecedor/${cod}`, {
        method: 'PUT',
        headers: headersAutenticados(),
        body: JSON.stringify(dados)
    })
        .then(async (res) => {
            const corpo = await res.json();
            resposta.innerHTML = `<p>${corpo.message}</p>`;
        })
        .catch((err) => {
            console.error('Erro ao atualizar Fornecedor', err);
            resposta.innerHTML = '<p>Não foi possível conectar ao servidor.</p>';
        });
});
