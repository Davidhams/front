const resposta = document.getElementById('resposta');
const tabela = document.getElementById('tabela_entrega');

fetch(`${API_BASE_URL}/entregas`, { headers: headersAutenticados() })
    .then((res) => res.json())
    .then((lista) => {
        if (!Array.isArray(lista) || lista.length === 0) {
            resposta.innerHTML = '<p>Nenhum registro encontrado.</p>';
            return;
        }
        tabela.innerHTML = lista.map((item) => `<tr><td>${item.codEntrega !== undefined && item.codEntrega !== null ? item.codEntrega : ''}</td><td>${item.idPedido !== undefined && item.idPedido !== null ? item.idPedido : ''}</td><td>${item.entregador !== undefined && item.entregador !== null ? item.entregador : ''}</td><td>${item.localEntrega !== undefined && item.localEntrega !== null ? item.localEntrega : ''}</td><td>${item.dataHoraSaida !== undefined && item.dataHoraSaida !== null ? item.dataHoraSaida : ''}</td><td>${item.dataHoraEntrega !== undefined && item.dataHoraEntrega !== null ? item.dataHoraEntrega : ''}</td></tr>`).join('');
    })
    .catch((err) => {
        console.error('Erro ao listar Entregas', err);
        resposta.innerHTML = '<p>Não foi possível carregar a lista.</p>';
    });
