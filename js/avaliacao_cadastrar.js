const resposta = document.getElementById('resposta');
const btn_cadastrar = document.getElementById('btn_cadastrar');

btn_cadastrar.addEventListener('click', async (e) => {
    e.preventDefault();

    const idCliente = document.getElementById('idCliente').value;
    const idProduto = document.getElementById('idProduto').value;
    const nota = document.getElementById('nota').value;
    const comentario = document.getElementById('comentario').value;
    const dataAvaliacao = document.getElementById('dataAvaliacao').value;

    const dados = {
        idCliente: idCliente === '' ? undefined : Number(idCliente),
        idProduto: idProduto === '' ? undefined : Number(idProduto),
        nota: nota === '' ? undefined : Number(nota),
        comentario: comentario,
        dataAvaliacao: dataAvaliacao
    };

    fetch(`${API_BASE_URL}/avaliacao/admin`, {
        method: 'POST',
        headers: headersAutenticados(),
        body: JSON.stringify(dados)
    })
        .then(async (res) => {
            const corpo = await res.json();
            resposta.innerHTML = `<p>${corpo.message}</p>`;
            if (res.ok) {
                document.querySelector('form').reset();
            }
        })
        .catch((err) => {
            console.error('Erro ao cadastrar Avaliação', err);
            resposta.innerHTML = '<p>Não foi possível conectar ao servidor.</p>';
        });
});
