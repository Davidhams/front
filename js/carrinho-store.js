// Carrinho de compras simples, guardado no localStorage do navegador
// (site final no Vercel, então localStorage funciona normalmente).

function pegarCarrinho() {
    const bruto = localStorage.getItem('habitatCarrinho');
    return bruto ? JSON.parse(bruto) : [];
}

function salvarCarrinho(itens) {
    localStorage.setItem('habitatCarrinho', JSON.stringify(itens));
}

function adicionarAoCarrinho(produto, quantidade) {
    const itens = pegarCarrinho();
    const existente = itens.find((i) => i.idProduto === produto.codProduto);

    if (existente) {
        existente.quantidade += quantidade;
    } else {
        itens.push({
            idProduto: produto.codProduto,
            nomeProduto: produto.nomeProduto,
            precoUnitario: Number(produto.precoUnitario),
            quantidade: quantidade
        });
    }

    salvarCarrinho(itens);
}

function removerDoCarrinho(idProduto) {
    const itens = pegarCarrinho().filter((i) => i.idProduto !== idProduto);
    salvarCarrinho(itens);
}

function limparCarrinho() {
    localStorage.removeItem('habitatCarrinho');
}

function totalCarrinho() {
    return pegarCarrinho().reduce((soma, i) => soma + (i.precoUnitario * i.quantidade), 0);
}
