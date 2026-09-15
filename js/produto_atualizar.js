const resposta = document.getElementById('resposta');
const btn_buscar = document.getElementById('btn_buscar');
const btn_atualizar = document.getElementById('btn_atualizar');

btn_buscar.addEventListener('click', () => {
    const cod = document.getElementById('codBusca').value;

    fetch(`${API_BASE_URL}/produto/${cod}`, { headers: headersAutenticados() })
        .then(async (res) => {
            const item = await res.json();
            if (!res.ok) {
                resposta.innerHTML = `<p>${item.message}</p>`;
                return;
            }
            resposta.innerHTML = '';
        if (item.nomeProduto !== undefined && item.nomeProduto !== null) document.getElementById('nomeProduto').value = item.nomeProduto;
        document.getElementById('categoria').value = String(item.categoria);
        if (item.precoUnitario !== undefined && item.precoUnitario !== null) document.getElementById('precoUnitario').value = item.precoUnitario;
        if (item.quantidadeEstoque !== undefined && item.quantidadeEstoque !== null) document.getElementById('quantidadeEstoque').value = item.quantidadeEstoque;
        if (item.pesoKg !== undefined && item.pesoKg !== null) document.getElementById('pesoKg').value = item.pesoKg;
        document.getElementById('exigeMontagem').value = String(item.exigeMontagem);
        if (item.imagemBase64) document.getElementById('imagemBase64_preview').src = item.imagemBase64;
        })
        .catch((err) => {
            console.error('Erro ao buscar Produto', err);
            resposta.innerHTML = '<p>Não foi possível conectar ao servidor.</p>';
        });
});

btn_atualizar.addEventListener('click', async (e) => {
    e.preventDefault();
    const cod = document.getElementById('codBusca').value;
    if (!cod) {
        resposta.innerHTML = '<p>Busque um registro antes de atualizar.</p>';
        return;
    }

    const nomeProduto = document.getElementById('nomeProduto').value;
    const categoria = document.getElementById('categoria').value;
    const precoUnitario = document.getElementById('precoUnitario').value;
    const quantidadeEstoque = document.getElementById('quantidadeEstoque').value;
    const pesoKg = document.getElementById('pesoKg').value;
    const exigeMontagem = document.getElementById('exigeMontagem').value;

    const imagemInput = document.getElementById('imagemBase64');
    const imagemBase64 = await converterImagemParaBase64(imagemInput);

    const dados = {
        nomeProduto: nomeProduto,
        categoria: categoria,
        precoUnitario: precoUnitario === '' ? undefined : Number(precoUnitario),
        quantidadeEstoque: quantidadeEstoque === '' ? undefined : Number(quantidadeEstoque),
        pesoKg: pesoKg === '' ? undefined : Number(pesoKg),
        exigeMontagem: exigeMontagem === 'true',
        ...(imagemBase64 ? { imagemBase64 } : {})
    };

    fetch(`${API_BASE_URL}/produto/${cod}`, {
        method: 'PUT',
        headers: headersAutenticados(),
        body: JSON.stringify(dados)
    })
        .then(async (res) => {
            const corpo = await res.json();
            resposta.innerHTML = `<p>${corpo.message}</p>`;
        })
        .catch((err) => {
            console.error('Erro ao atualizar Produto', err);
            resposta.innerHTML = '<p>Não foi possível conectar ao servidor.</p>';
        });
});
