const resposta = document.getElementById('resposta');
const resultado = document.getElementById('resultado');
const btn_consultar = document.getElementById('btn_consultar');

btn_consultar.addEventListener('click', (e) => {
    e.preventDefault();
    const cod = document.getElementById('codBusca').value;

    fetch(`${API_BASE_URL}/cliente/${cod}`, { headers: headersAutenticados() })
        .then(async (res) => {
            const item = await res.json();
            if (!res.ok) {
                resultado.innerHTML = '';
                resposta.innerHTML = `<p>${item.message}</p>`;
                return;
            }
            resposta.innerHTML = '';
            resultado.innerHTML = `
        <p><strong>codCliente:</strong> ${item.codCliente}</p>
        <p><strong>Nome:</strong> ${item.nome !== undefined && item.nome !== null ? item.nome : ''}</p>
        <p><strong>E-mail:</strong> ${item.email !== undefined && item.email !== null ? item.email : ''}</p>
        <p><strong>Telefone:</strong> ${item.telefone !== undefined && item.telefone !== null ? item.telefone : ''}</p>
        <p><strong>Tipo de Cliente:</strong> ${item.tipoCliente !== undefined && item.tipoCliente !== null ? item.tipoCliente : ''}</p>
            `;
        })
        .catch((err) => {
            console.error('Erro ao consultar Cliente', err);
            resposta.innerHTML = '<p>Não foi possível conectar ao servidor.</p>';
        });
});
