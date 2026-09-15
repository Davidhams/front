const resposta = document.getElementById('resposta');
const resultado = document.getElementById('resultado');
const btn_consultar = document.getElementById('btn_consultar');

btn_consultar.addEventListener('click', (e) => {
    e.preventDefault();
    const cod = document.getElementById('codBusca').value;

    fetch(`${API_BASE_URL}/fornecedor/${cod}`, { headers: headersAutenticados() })
        .then(async (res) => {
            const item = await res.json();
            if (!res.ok) {
                resultado.innerHTML = '';
                resposta.innerHTML = `<p>${item.message}</p>`;
                return;
            }
            resposta.innerHTML = '';
            resultado.innerHTML = `
        <p><strong>codFornecedor:</strong> ${item.codFornecedor}</p>
        <p><strong>Nome do Fornecedor:</strong> ${item.nomeFornecedor !== undefined && item.nomeFornecedor !== null ? item.nomeFornecedor : ''}</p>
        <p><strong>CNPJ:</strong> ${item.cnpj !== undefined && item.cnpj !== null ? item.cnpj : ''}</p>
        <p><strong>Categoria Fornecida:</strong> ${item.categoriaFornecida !== undefined && item.categoriaFornecida !== null ? item.categoriaFornecida : ''}</p>
        <p><strong>Prazo de Entrega (dias):</strong> ${item.prazoEntregaDias !== undefined && item.prazoEntregaDias !== null ? item.prazoEntregaDias : ''}</p>
            `;
        })
        .catch((err) => {
            console.error('Erro ao consultar Fornecedor', err);
            resposta.innerHTML = '<p>Não foi possível conectar ao servidor.</p>';
        });
});
