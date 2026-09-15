const resposta = document.getElementById('resposta');
const resultado = document.getElementById('resultado');
const btn_consultar = document.getElementById('btn_consultar');

btn_consultar.addEventListener('click', (e) => {
    e.preventDefault();
    const cod = document.getElementById('codBusca').value;

    fetch(`${API_BASE_URL}/item-pedido/${cod}`, { headers: headersAutenticados() })
        .then(async (res) => {
            const item = await res.json();
            if (!res.ok) {
                resultado.innerHTML = '';
                resposta.innerHTML = `<p>${item.message}</p>`;
                return;
            }
            resposta.innerHTML = '';
            resultado.innerHTML = `
        <p><strong>codItemPedido:</strong> ${item.codItemPedido}</p>
        <p><strong>Código do Pedido:</strong> ${item.idPedido !== undefined && item.idPedido !== null ? item.idPedido : ''}</p>
        <p><strong>Código do Produto:</strong> ${item.idProduto !== undefined && item.idProduto !== null ? item.idProduto : ''}</p>
        <p><strong>Quantidade:</strong> ${item.quantidade !== undefined && item.quantidade !== null ? item.quantidade : ''}</p>
        <p><strong>Preço Unitário:</strong> ${item.precoUnitario !== undefined && item.precoUnitario !== null ? item.precoUnitario : ''}</p>
        <p><strong>Subtotal:</strong> ${item.subtotal !== undefined && item.subtotal !== null ? item.subtotal : ''}</p>
            `;
        })
        .catch((err) => {
            console.error('Erro ao consultar Item do Pedido', err);
            resposta.innerHTML = '<p>Não foi possível conectar ao servidor.</p>';
        });
});
