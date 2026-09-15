exigirLogin();

const resposta = document.getElementById('resposta');
const lista_pedidos = document.getElementById('lista_pedidos');

const NOMES_STATUS = {
    PENDENTE: 'Pendente',
    EM_ROTA: 'Em rota de entrega',
    ENTREGUE: 'Entregue',
    CANCELADO: 'Cancelado'
};

fetch(`${API_BASE_URL}/pedido/meus`, { headers: headersAutenticados() })
    .then((res) => res.json())
    .then((pedidos) => {
        if (pedidos.length === 0) {
            resposta.innerHTML = '<p>Você ainda não fez nenhum pedido.</p>';
            return;
        }

        lista_pedidos.innerHTML = pedidos.map((pedido) => `
            <div class="cartao_produto">
                <h2>Pedido #${pedido.codPedido}</h2>
                <p>Data: ${pedido.dataPedido} às ${pedido.horaPedido}</p>
                <p>Entrega: ${pedido.tipoEntrega === 'SAME_DAY' ? 'Mesmo dia' : 'Em até 24h'}</p>
                <p>Status: ${NOMES_STATUS[pedido.status] || pedido.status}</p>
                <p>Total: R$ ${Number(pedido.valorTotal).toFixed(2)}</p>
                <table>
                    <thead><tr><th>Produto</th><th>Qtd</th><th>Preço Unit.</th><th>Subtotal</th></tr></thead>
                    <tbody>
                        ${(pedido.itensPedido || []).map((item) => `
                            <tr>
                                <td>Produto #${item.idProduto}</td>
                                <td>${item.quantidade}</td>
                                <td>R$ ${Number(item.precoUnitario).toFixed(2)}</td>
                                <td>R$ ${Number(item.subtotal).toFixed(2)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `).join('');
    })
    .catch((err) => {
        console.error('Erro ao carregar pedidos', err);
        resposta.innerHTML = '<p>Não foi possível carregar seus pedidos.</p>';
    });
