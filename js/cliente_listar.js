const resposta = document.getElementById('resposta');
const tabela = document.getElementById('tabela_cliente');

fetch(`${API_BASE_URL}/clientes`, { headers: headersAutenticados() })
    .then((res) => res.json())
    .then((lista) => {
        if (!Array.isArray(lista) || lista.length === 0) {
            resposta.innerHTML = '<p>Nenhum registro encontrado.</p>';
            return;
        }
        tabela.innerHTML = lista.map((item) => `<tr><td>${item.codCliente !== undefined && item.codCliente !== null ? item.codCliente : ''}</td><td>${item.nome !== undefined && item.nome !== null ? item.nome : ''}</td><td>${item.email !== undefined && item.email !== null ? item.email : ''}</td><td>${item.telefone !== undefined && item.telefone !== null ? item.telefone : ''}</td><td>${item.tipoCliente !== undefined && item.tipoCliente !== null ? item.tipoCliente : ''}</td></tr>`).join('');
    })
    .catch((err) => {
        console.error('Erro ao listar Clientes', err);
        resposta.innerHTML = '<p>Não foi possível carregar a lista.</p>';
    });
