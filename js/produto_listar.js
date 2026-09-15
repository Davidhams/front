const resposta = document.getElementById('resposta');
const tabela = document.getElementById('tabela_produto');

fetch(`${API_BASE_URL}/produtos`, { headers: headersAutenticados() })
    .then((res) => res.json())
    .then((lista) => {
        if (!Array.isArray(lista) || lista.length === 0) {
            resposta.innerHTML = '<p>Nenhum registro encontrado.</p>';
            return;
        }
        tabela.innerHTML = lista.map((item) => `<tr><td>${item.codProduto !== undefined && item.codProduto !== null ? item.codProduto : ''}</td><td>${item.nomeProduto !== undefined && item.nomeProduto !== null ? item.nomeProduto : ''}</td><td>${item.categoria !== undefined && item.categoria !== null ? item.categoria : ''}</td><td>${item.precoUnitario !== undefined && item.precoUnitario !== null ? item.precoUnitario : ''}</td><td>${item.quantidadeEstoque !== undefined && item.quantidadeEstoque !== null ? item.quantidadeEstoque : ''}</td><td>${item.imagemBase64 ? `<img class="produto_imagem_tabela" src="${item.imagemBase64}">` : ''}</td></tr>`).join('');
    })
    .catch((err) => {
        console.error('Erro ao listar Produtos', err);
        resposta.innerHTML = '<p>Não foi possível carregar a lista.</p>';
    });
