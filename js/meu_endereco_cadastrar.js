exigirLogin();

const resposta = document.getElementById('resposta');
const btn_cadastrar = document.getElementById('btn_cadastrar');
const tabela_enderecos = document.getElementById('tabela_enderecos');

function carregarEnderecos() {
    fetch(`${API_BASE_URL}/endereco/meus`, { headers: headersAutenticados() })
        .then((res) => res.json())
        .then((enderecos) => {
            tabela_enderecos.innerHTML = enderecos.map((e) => `
                <tr>
                    <td>${e.codEndereco}</td>
                    <td>${e.logradouro}</td>
                    <td>${e.numero}</td>
                    <td>${e.cep}</td>
                    <td>${e.proximoBR101 ? 'Sim' : 'Não'}</td>
                </tr>
            `).join('');
        })
        .catch((err) => console.error('Erro ao listar endereços', err));
}

btn_cadastrar.addEventListener('click', (e) => {
    e.preventDefault();

    const condominio = document.getElementById('condominio').value;
    const logradouro = document.getElementById('logradouro').value;
    const numero = document.getElementById('numero').value;
    const cep = document.getElementById('cep').value;
    const proximoBR101 = document.getElementById('proximoBR101').value === 'true';

    fetch(`${API_BASE_URL}/endereco/meu`, {
        method: 'POST',
        headers: headersAutenticados(),
        body: JSON.stringify({ condominio, logradouro, numero, cep, proximoBR101 })
    })
        .then(async (res) => {
            const dados = await res.json();
            resposta.innerHTML = `<p>${dados.message}</p>`;
            if (res.ok) {
                document.querySelector('form').reset();
                carregarEnderecos();
            }
        })
        .catch((err) => {
            console.error('Erro ao cadastrar endereço', err);
            resposta.innerHTML = '<p>Não foi possível conectar ao servidor.</p>';
        });
});

carregarEnderecos();
