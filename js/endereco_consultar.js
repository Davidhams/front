const resposta = document.getElementById('resposta');
const resultado = document.getElementById('resultado');
const btn_consultar = document.getElementById('btn_consultar');

btn_consultar.addEventListener('click', (e) => {
    e.preventDefault();
    const cod = document.getElementById('codBusca').value;

    fetch(`${API_BASE_URL}/endereco/${cod}`, { headers: headersAutenticados() })
        .then(async (res) => {
            const item = await res.json();
            if (!res.ok) {
                resultado.innerHTML = '';
                resposta.innerHTML = `<p>${item.message}</p>`;
                return;
            }
            resposta.innerHTML = '';
            resultado.innerHTML = `
        <p><strong>codEndereco:</strong> ${item.codEndereco}</p>
        <p><strong>Código do Cliente:</strong> ${item.idCliente !== undefined && item.idCliente !== null ? item.idCliente : ''}</p>
        <p><strong>Condomínio:</strong> ${item.condominio !== undefined && item.condominio !== null ? item.condominio : ''}</p>
        <p><strong>Logradouro:</strong> ${item.logradouro !== undefined && item.logradouro !== null ? item.logradouro : ''}</p>
        <p><strong>Número:</strong> ${item.numero !== undefined && item.numero !== null ? item.numero : ''}</p>
        <p><strong>CEP:</strong> ${item.cep !== undefined && item.cep !== null ? item.cep : ''}</p>
        <p><strong>Próximo à BR-101?:</strong> ${item.proximoBR101 !== undefined && item.proximoBR101 !== null ? item.proximoBR101 : ''}</p>
            `;
        })
        .catch((err) => {
            console.error('Erro ao consultar Endereço', err);
            resposta.innerHTML = '<p>Não foi possível conectar ao servidor.</p>';
        });
});
