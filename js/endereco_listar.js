const resposta = document.getElementById('resposta');
const tabela = document.getElementById('tabela_endereco');

fetch(`${API_BASE_URL}/enderecos`, { headers: headersAutenticados() })
    .then((res) => res.json())
    .then((lista) => {
        if (!Array.isArray(lista) || lista.length === 0) {
            resposta.innerHTML = '<p>Nenhum registro encontrado.</p>';
            return;
        }
        tabela.innerHTML = lista.map((item) => `<tr><td>${item.codEndereco !== undefined && item.codEndereco !== null ? item.codEndereco : ''}</td><td>${item.idCliente !== undefined && item.idCliente !== null ? item.idCliente : ''}</td><td>${item.logradouro !== undefined && item.logradouro !== null ? item.logradouro : ''}</td><td>${item.numero !== undefined && item.numero !== null ? item.numero : ''}</td><td>${item.cep !== undefined && item.cep !== null ? item.cep : ''}</td><td>${item.proximoBR101 !== undefined && item.proximoBR101 !== null ? item.proximoBR101 : ''}</td></tr>`).join('');
    })
    .catch((err) => {
        console.error('Erro ao listar Endereços', err);
        resposta.innerHTML = '<p>Não foi possível carregar a lista.</p>';
    });
