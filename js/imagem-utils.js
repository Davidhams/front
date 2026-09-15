// Converte o arquivo escolhido no <input type="file"> em uma string Base64
// (Data URL), pronta para ser enviada no JSON e salva no banco.
function converterImagemParaBase64(inputFile) {
    return new Promise((resolve, reject) => {
        const arquivo = inputFile.files[0];
        if (!arquivo) {
            resolve('');
            return;
        }
        const leitor = new FileReader();
        leitor.onload = () => resolve(leitor.result);
        leitor.onerror = reject;
        leitor.readAsDataURL(arquivo);
    });
}
