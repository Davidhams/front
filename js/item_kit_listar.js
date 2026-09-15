const resposta = document.getElementById('resposta');
const tabela = document.getElementById('tabela_item_kit');

fetch(`${API_BASE_URL}/itens-kit`, { headers: headersAutenticados() })
    .then((res) => res.json())
    .then((lista) => {
        if (!Array.isArray(lista) || lista.length === 0) {
            resposta.innerHTML = '<p>Nenhum registro encontrado.</p>';
            return;
        }
        tabela.innerHTML = lista.map((item) => `<tr><td>${item.codItemKit !== undefined && item.codItemKit !== null ? item.codItemKit : ''}</td><td>${item.idKit !== undefined && item.idKit !== null ? item.idKit : ''}</td><td>${item.idProduto !== undefined && item.idProduto !== null ? item.idProduto : ''}</td><td>${item.quantidade !== undefined && item.quantidade !== null ? item.quantidade : ''}</td></tr>`).join('');
    })
    .catch((err) => {
        console.error('Erro ao listar Itens do Kit', err);
        resposta.innerHTML = '<p>Não foi possível carregar a lista.</p>';
    });
