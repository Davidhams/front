const resposta = document.getElementById('resposta');
const tabela = document.getElementById('tabela_kit_pronto');

fetch(`${API_BASE_URL}/kits`, { headers: headersAutenticados() })
    .then((res) => res.json())
    .then((lista) => {
        if (!Array.isArray(lista) || lista.length === 0) {
            resposta.innerHTML = '<p>Nenhum registro encontrado.</p>';
            return;
        }
        tabela.innerHTML = lista.map((item) => `<tr><td>${item.codKit !== undefined && item.codKit !== null ? item.codKit : ''}</td><td>${item.nomeKit !== undefined && item.nomeKit !== null ? item.nomeKit : ''}</td><td>${item.precoKit !== undefined && item.precoKit !== null ? item.precoKit : ''}</td><td>${item.publicoAlvo !== undefined && item.publicoAlvo !== null ? item.publicoAlvo : ''}</td></tr>`).join('');
    })
    .catch((err) => {
        console.error('Erro ao listar Kits Prontos', err);
        resposta.innerHTML = '<p>Não foi possível carregar a lista.</p>';
    });
