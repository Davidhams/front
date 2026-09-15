const resposta = document.getElementById('resposta');
const btn_cadastrar = document.getElementById('btn_cadastrar');

btn_cadastrar.addEventListener('click', async (e) => {
    e.preventDefault();

    const idPedido = document.getElementById('idPedido').value;
    const entregador = document.getElementById('entregador').value;
    const localEntrega = document.getElementById('localEntrega').value;
    const dataHoraSaida = document.getElementById('dataHoraSaida').value;
    const dataHoraEntrega = document.getElementById('dataHoraEntrega').value;

    const dados = {
        idPedido: idPedido === '' ? undefined : Number(idPedido),
        entregador: entregador,
        localEntrega: localEntrega,
        dataHoraSaida: dataHoraSaida,
        dataHoraEntrega: dataHoraEntrega
    };

    fetch(`${API_BASE_URL}/entrega`, {
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
            console.error('Erro ao cadastrar Entrega', err);
            resposta.innerHTML = '<p>Não foi possível conectar ao servidor.</p>';
        });
});
