const resposta = document.getElementById('resposta');
const resultado = document.getElementById('resultado');
const btn_consultar = document.getElementById('btn_consultar');

btn_consultar.addEventListener('click', (e) => {
    e.preventDefault();
    const cod = document.getElementById('codBusca').value;

    fetch(`${API_BASE_URL}/kit/${cod}`, { headers: headersAutenticados() })
        .then(async (res) => {
            const item = await res.json();
            if (!res.ok) {
                resultado.innerHTML = '';
                resposta.innerHTML = `<p>${item.message}</p>`;
                return;
            }
            resposta.innerHTML = '';
            resultado.innerHTML = `
        <p><strong>codKit:</strong> ${item.codKit}</p>
        <p><strong>Nome do Kit:</strong> ${item.nomeKit !== undefined && item.nomeKit !== null ? item.nomeKit : ''}</p>
        <p><strong>Descrição:</strong> ${item.descricao !== undefined && item.descricao !== null ? item.descricao : ''}</p>
        <p><strong>Preço do Kit:</strong> ${item.precoKit !== undefined && item.precoKit !== null ? item.precoKit : ''}</p>
        <p><strong>Público Alvo:</strong> ${item.publicoAlvo !== undefined && item.publicoAlvo !== null ? item.publicoAlvo : ''}</p>
            `;
        })
        .catch((err) => {
            console.error('Erro ao consultar Kit Pronto', err);
            resposta.innerHTML = '<p>Não foi possível conectar ao servidor.</p>';
        });
});
