const resposta = document.getElementById('resposta');
const tabela = document.getElementById('tabela_item_pedido');

fetch(`${API_BASE_URL}/itens-pedido`, { headers: headersAutenticados() })
    .then((res) => res.json())
    .then((lista) => {
        if (!Array.isArray(lista) || lista.length === 0) {
            resposta.innerHTML = '<p>Nenhum registro encontrado.</p>';
            return;
        }
        tabela.innerHTML = lista.map((item) => `<tr><td>${item.codItemPedido !== undefined && item.codItemPedido !== null ? item.codItemPedido : ''}</td><td>${item.idPedido !== undefined && item.idPedido !== null ? item.idPedido : ''}</td><td>${item.idProduto !== undefined && item.idProduto !== null ? item.idProduto : ''}</td><td>${item.quantidade !== undefined && item.quantidade !== null ? item.quantidade : ''}</td><td>${item.precoUnitario !== undefined && item.precoUnitario !== null ? item.precoUnitario : ''}</td><td>${item.subtotal !== undefined && item.subtotal !== null ? item.subtotal : ''}</td></tr>`).join('');
    })
    .catch((err) => {
        console.error('Erro ao listar Itens do Pedido', err);
        resposta.innerHTML = '<p>Não foi possível carregar a lista.</p>';
    });
