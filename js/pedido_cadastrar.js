const resposta = document.getElementById('resposta');
const btn_cadastrar = document.getElementById('btn_cadastrar');

btn_cadastrar.addEventListener('click', async (e) => {
    e.preventDefault();

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

    fetch(`${API_BASE_URL}/pedido`, {
        method: 'POST',
        headers: headersAutenticados(),
        body: JSON.stringify(dados)
    })
        .then(async (res) => {
            const corpo = await res.json();
            resposta.innerHTML = `<p>${corpo.message}</p>`;
            if (res.ok) {
                document.querySelector('form').reset();
            }
        })
        .catch((err) => {
            console.error('Erro ao cadastrar Pedido', err);
            resposta.innerHTML = '<p>Não foi possível conectar ao servidor.</p>';
        });
});
