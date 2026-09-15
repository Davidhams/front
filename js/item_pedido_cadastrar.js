const resposta = document.getElementById('resposta');
const btn_cadastrar = document.getElementById('btn_cadastrar');

btn_cadastrar.addEventListener('click', async (e) => {
    e.preventDefault();

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

    fetch(`${API_BASE_URL}/item-pedido`, {
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
            console.error('Erro ao cadastrar Item do Pedido', err);
            resposta.innerHTML = '<p>Não foi possível conectar ao servidor.</p>';
        });
});
