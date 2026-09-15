const resposta = document.getElementById('resposta');
const tabela = document.getElementById('tabela_avaliacao');

fetch(`${API_BASE_URL}/avaliacoes`, { headers: headersAutenticados() })
    .then((res) => res.json())
    .then((lista) => {
        if (!Array.isArray(lista) || lista.length === 0) {
            resposta.innerHTML = '<p>Nenhum registro encontrado.</p>';
            return;
        }
        tabela.innerHTML = lista.map((item) => `<tr><td>${item.codAvaliacao !== undefined && item.codAvaliacao !== null ? item.codAvaliacao : ''}</td><td>${item.idCliente !== undefined && item.idCliente !== null ? item.idCliente : ''}</td><td>${item.idProduto !== undefined && item.idProduto !== null ? item.idProduto : ''}</td><td>${item.nota !== undefined && item.nota !== null ? item.nota : ''}</td><td>${item.dataAvaliacao !== undefined && item.dataAvaliacao !== null ? item.dataAvaliacao : ''}</td></tr>`).join('');
    })
    .catch((err) => {
        console.error('Erro ao listar Avaliações', err);
        resposta.innerHTML = '<p>Não foi possível carregar a lista.</p>';
    });
