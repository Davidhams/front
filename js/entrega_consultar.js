const resposta = document.getElementById('resposta');
const resultado = document.getElementById('resultado');
const btn_consultar = document.getElementById('btn_consultar');

btn_consultar.addEventListener('click', (e) => {
    e.preventDefault();
    const cod = document.getElementById('codBusca').value;

    fetch(`${API_BASE_URL}/entrega/${cod}`, { headers: headersAutenticados() })
        .then(async (res) => {
            const item = await res.json();
            if (!res.ok) {
                resultado.innerHTML = '';
                resposta.innerHTML = `<p>${item.message}</p>`;
                return;
            }
            resposta.innerHTML = '';
            resultado.innerHTML = `
        <p><strong>codEntrega:</strong> ${item.codEntrega}</p>
        <p><strong>Código do Pedido:</strong> ${item.idPedido !== undefined && item.idPedido !== null ? item.idPedido : ''}</p>
        <p><strong>Entregador:</strong> ${item.entregador !== undefined && item.entregador !== null ? item.entregador : ''}</p>
        <p><strong>Local de Entrega:</strong> ${item.localEntrega !== undefined && item.localEntrega !== null ? item.localEntrega : ''}</p>
        <p><strong>Data/Hora de Saída:</strong> ${item.dataHoraSaida !== undefined && item.dataHoraSaida !== null ? item.dataHoraSaida : ''}</p>
        <p><strong>Data/Hora de Entrega:</strong> ${item.dataHoraEntrega !== undefined && item.dataHoraEntrega !== null ? item.dataHoraEntrega : ''}</p>
            `;
        })
        .catch((err) => {
            console.error('Erro ao consultar Entrega', err);
            resposta.innerHTML = '<p>Não foi possível conectar ao servidor.</p>';
        });
});
