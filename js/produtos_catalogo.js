const resposta = document.getElementById('resposta');
const lista_produtos = document.getElementById('lista_produtos');

const NOMES_CATEGORIA = {
    AUTOMACAO: 'Automação',
    CAMA_MESA_BANHO: 'Cama, Mesa e Banho',
    DESIGN_DECORACAO: 'Design e Decoração',
    MOVEIS_DECORACAO: 'Móveis e Decoração',
    UTILIDADES_GOURMET: 'Utilidades Gourmet'
};

function carregarProdutos() {
    fetch(`${API_BASE_URL}/produtos`)
        .then((res) => res.json())
        .then((produtos) => {
            lista_produtos.innerHTML = '';

            produtos.forEach((produto) => {
                const cartao = document.createElement('div');
                cartao.className = 'cartao_produto';

                cartao.innerHTML = `
                    ${produto.imagemBase64 ? `<img class="produto_imagem_preview" src="${produto.imagemBase64}" alt="${produto.nomeProduto}"><br>` : ''}
                    <h2>${produto.nomeProduto}</h2>
                    <p>Categoria: ${NOMES_CATEGORIA[produto.categoria] || produto.categoria}</p>
                    <p>Preço: R$ ${Number(produto.precoUnitario).toFixed(2)}</p>
                    <p>Estoque: ${produto.quantidadeEstoque}</p>
                    <label for="qtd_${produto.codProduto}">Quantidade</label>
                    <input type="number" id="qtd_${produto.codProduto}" value="1" min="1" max="${produto.quantidadeEstoque}">
                    <br><br>
                    <button id="btn_add_${produto.codProduto}">Adicionar ao carrinho</button>
                `;

                lista_produtos.appendChild(cartao);

                document.getElementById(`btn_add_${produto.codProduto}`).addEventListener('click', () => {
                    if (!estaLogado()) {
                        alert('Faça login para adicionar produtos ao carrinho.');
                        window.location.href = './login.html';
                        return;
                    }
                    const quantidade = Number(document.getElementById(`qtd_${produto.codProduto}`).value) || 1;
                    adicionarAoCarrinho(produto, quantidade);
                    resposta.innerHTML = `<p>"${produto.nomeProduto}" adicionado ao carrinho!</p>`;
                });
            });
        })
        .catch((err) => {
            console.error('Erro ao carregar produtos', err);
            resposta.innerHTML = '<p>Não foi possível carregar o catálogo.</p>';
        });
}

carregarProdutos();
