const resposta = document.getElementById('resposta');
const resultado = document.getElementById('resultado');
const btn_consultar = document.getElementById('btn_consultar');

btn_consultar.addEventListener('click', (e) => {
    e.preventDefault();
    const cod = document.getElementById('codBusca').value;

    fetch(`${API_BASE_URL}/pedido/${cod}`, { headers: headersAutenticados() })
        .then(async (res) => {
            const item = await res.json();
            if (!res.ok) {
                resultado.innerHTML = '';
                resposta.innerHTML = `<p>${item.message}</p>`;
                return;
            }
            resposta.innerHTML = '';
            resultado.innerHTML = `
        <p><strong>codPedido:</strong> ${item.codPedido}</p>
        <p><strong>Código do Cliente:</strong> ${item.idCliente !== undefined && item.idCliente !== null ? item.idCliente : ''}</p>
        <p><strong>Código do Endereço:</strong> ${item.idEndereco !== undefined && item.idEndereco !== null ? item.idEndereco : ''}</p>
        <p><strong>Data do Pedido:</strong> ${item.dataPedido !== undefined && item.dataPedido !== null ? item.dataPedido : ''}</p>
        <p><strong>Hora do Pedido:</strong> ${item.horaPedido !== undefined && item.horaPedido !== null ? item.horaPedido : ''}</p>
        <p><strong>Tipo de Entrega:</strong> ${item.tipoEntrega !== undefined && item.tipoEntrega !== null ? item.tipoEntrega : ''}</p>
        <p><strong>Status:</strong> ${item.status !== undefined && item.status !== null ? item.status : ''}</p>
        <p><strong>Valor Total:</strong> ${item.valorTotal !== undefined && item.valorTotal !== null ? item.valorTotal : ''}</p>
            `;
        })
        .catch((err) => {
            console.error('Erro ao consultar Pedido', err);
            resposta.innerHTML = '<p>Não foi possível conectar ao servidor.</p>';
        });
});
