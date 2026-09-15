// Funções de sessão do cliente logado. Guardadas no localStorage do
// navegador (isso é o site final rodando no Vercel, não um artifact/preview
// do chat, então localStorage funciona normalmente aqui).

function salvarSessao(token, cliente) {
    localStorage.setItem('habitatToken', token);
    localStorage.setItem('habitatCliente', JSON.stringify(cliente));
}

function pegarToken() {
    return localStorage.getItem('habitatToken');
}

function pegarClienteLogado() {
    const bruto = localStorage.getItem('habitatCliente');
    return bruto ? JSON.parse(bruto) : null;
}

function estaLogado() {
    return !!pegarToken();
}

function ehAdmin() {
    const cliente = pegarClienteLogado();
    return !!cliente && cliente.tipoCliente === 'ADMIN';
}

function encerrarSessao() {
    localStorage.removeItem('habitatToken');
    localStorage.removeItem('habitatCliente');
}

// Monta os headers padrão (com o token, se existir) pra usar no fetch()
function headersAutenticados(comJson = true) {
    const headers = {};
    if (comJson) headers['Content-Type'] = 'application/json';
    const token = pegarToken();
    if (token) headers['Authorization'] = 'Bearer ' + token;
    return headers;
}

// Usa no topo das páginas que só o cliente logado pode acessar
function exigirLogin() {
    if (!estaLogado()) {
        window.location.href = pathParaRaiz() + 'html/login.html';
    }
}

// Usa no topo das páginas de administração (CRUD completo)
function exigirAdmin() {
    if (!estaLogado()) {
        window.location.href = pathParaRaiz() + 'html/login.html';
        return;
    }
    if (!ehAdmin()) {
        alert('Acesso restrito ao administrador.');
        window.location.href = pathParaRaiz() + 'html/produtos_catalogo.html';
    }
}

// Cada página define, ANTES de carregar auth.js/nav.js, uma variável global
// RAIZ: "" no index.html (que já está na raiz) e "../" nas páginas de
// dentro de /html. Isso evita links quebrados dependendo da profundidade.
function pathParaRaiz() {
    return typeof RAIZ !== 'undefined' ? RAIZ : '../';
}
