exigirLogin();

const tabela_carrinho = document.getElementById('tabela_carrinho');
const total_carrinho = document.getElementById('total_carrinho');
const idEnderecoSelect = document.getElementById('idEndereco');
const resposta = document.getElementById('resposta');
const btn_finalizar = document.getElementById('btn_finalizar');

function renderizarCarrinho() {
    const itens = pegarCarrinho();
    tabela_carrinho.innerHTML = '';

    itens.forEach((item) => {
        const subtotal = item.precoUnitario * item.quantidade;
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${item.nomeProduto}</td>
            <td>R$ ${item.precoUnitario.toFixed(2)}</td>
            <td>${item.quantidade}</td>
            <td>R$ ${subtotal.toFixed(2)}</td>
            <td><button data-id="${item.idProduto}" class="btn_remover">Remover</button></td>
        `;
        tabela_carrinho.appendChild(linha);
    });

    total_carrinho.innerHTML = `<strong>Total: R$ ${totalCarrinho().toFixed(2)}</strong>`;

    document.querySelectorAll('.btn_remover').forEach((botao) => {
        botao.addEventListener('click', () => {
            removerDoCarrinho(Number(botao.dataset.id));
            renderizarCarrinho();
        });
    });
}

function carregarEnderecos() {
    fetch(`${API_BASE_URL}/endereco/meus`, { headers: headersAutenticados() })
        .then((res) => res.json())
        .then((enderecos) => {
            idEnderecoSelect.innerHTML = enderecos.map((e) =>
                `<option value="${e.codEndereco}">${e.logradouro}, ${e.numero} - CEP ${e.cep}</option>`
            ).join('');

            if (enderecos.length === 0) {
                idEnderecoSelect.innerHTML = '<option value="">Nenhum endereço cadastrado</option>';
            }
        })
        .catch((err) => console.error('Erro ao carregar endereços', err));
}

btn_finalizar.addEventListener('click', () => {
    const itens = pegarCarrinho();
    const idEndereco = idEnderecoSelect.value;

    if (itens.length === 0) {
        resposta.innerHTML = '<p>Seu carrinho está vazio.</p>';
        return;
    }
    if (!idEndereco) {
        resposta.innerHTML = '<p>Cadastre e selecione um endereço antes de finalizar.</p>';
        return;
    }

    const corpo = {
        idEndereco: Number(idEndereco),
        itens: itens.map((i) => ({ idProduto: i.idProduto, quantidade: i.quantidade }))
    };

    fetch(`${API_BASE_URL}/pedido/finalizar`, {
        method: 'POST',
        headers: headersAutenticados(),
        body: JSON.stringify(corpo)
    })
        .then(async (res) => {
            const dados = await res.json();
            resposta.innerHTML = `<p>${dados.message}</p>`;
            if (res.ok) {
                limparCarrinho();
                setTimeout(() => { window.location.href = './meus_pedidos.html'; }, 1200);
            }
        })
        .catch((err) => {
            console.error('Erro ao finalizar compra', err);
            resposta.innerHTML = '<p>Não foi possível conectar ao servidor.</p>';
        });
});

renderizarCarrinho();
carregarEnderecos();
