const resposta = document.getElementById('resposta');
const btn_cadastrar = document.getElementById('btn_cadastrar');

btn_cadastrar.addEventListener('click', async (e) => {
    e.preventDefault();

    const idCliente = document.getElementById('idCliente').value;
    const condominio = document.getElementById('condominio').value;
    const logradouro = document.getElementById('logradouro').value;
    const numero = document.getElementById('numero').value;
    const cep = document.getElementById('cep').value;
    const proximoBR101 = document.getElementById('proximoBR101').value;

    const dados = {
        idCliente: idCliente === '' ? undefined : Number(idCliente),
        condominio: condominio,
        logradouro: logradouro,
        numero: numero,
        cep: cep,
        proximoBR101: proximoBR101 === 'true'
    };

    fetch(`${API_BASE_URL}/endereco`, {
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
            console.error('Erro ao cadastrar Endereço', err);
            resposta.innerHTML = '<p>Não foi possível conectar ao servidor.</p>';
        });
});
