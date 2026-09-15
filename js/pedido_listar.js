const resposta = document.getElementById('resposta');
const tabela = document.getElementById('tabela_pedido');

fetch(`${API_BASE_URL}/pedidos`, { headers: headersAutenticados() })
    .then((res) => res.json())
    .then((lista) => {
        if (!Array.isArray(lista) || lista.length === 0) {
            resposta.innerHTML = '<p>Nenhum registro encontrado.</p>';
            return;
        }
        tabela.innerHTML = lista.map((item) => `<tr><td>${item.codPedido !== undefined && item.codPedido !== null ? item.codPedido : ''}</td><td>${item.idCliente !== undefined && item.idCliente !== null ? item.idCliente : ''}</td><td>${item.dataPedido !== undefined && item.dataPedido !== null ? item.dataPedido : ''}</td><td>${item.tipoEntrega !== undefined && item.tipoEntrega !== null ? item.tipoEntrega : ''}</td><td>${item.status !== undefined && item.status !== null ? item.status : ''}</td><td>${item.valorTotal !== undefined && item.valorTotal !== null ? item.valorTotal : ''}</td></tr>`).join('');
    })
    .catch((err) => {
        console.error('Erro ao listar Pedidos', err);
        resposta.innerHTML = '<p>Não foi possível carregar a lista.</p>';
    });
