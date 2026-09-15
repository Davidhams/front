const resposta = document.getElementById('resposta');
const tabela = document.getElementById('tabela_fornecedor');

fetch(`${API_BASE_URL}/fornecedores`, { headers: headersAutenticados() })
    .then((res) => res.json())
    .then((lista) => {
        if (!Array.isArray(lista) || lista.length === 0) {
            resposta.innerHTML = '<p>Nenhum registro encontrado.</p>';
            return;
        }
        tabela.innerHTML = lista.map((item) => `<tr><td>${item.codFornecedor !== undefined && item.codFornecedor !== null ? item.codFornecedor : ''}</td><td>${item.nomeFornecedor !== undefined && item.nomeFornecedor !== null ? item.nomeFornecedor : ''}</td><td>${item.cnpj !== undefined && item.cnpj !== null ? item.cnpj : ''}</td><td>${item.categoriaFornecida !== undefined && item.categoriaFornecida !== null ? item.categoriaFornecida : ''}</td><td>${item.prazoEntregaDias !== undefined && item.prazoEntregaDias !== null ? item.prazoEntregaDias : ''}</td></tr>`).join('');
    })
    .catch((err) => {
        console.error('Erro ao listar Fornecedores', err);
        resposta.innerHTML = '<p>Não foi possível carregar a lista.</p>';
    });
