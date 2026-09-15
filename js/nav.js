// Preenche o <nav id="app-nav"></nav> presente em toda página, mudando os
// links de acordo com quem está logado (visitante / cliente / admin).
// Precisa rodar depois de auth.js e config.js.

function montarNavGlobal() {
    const nav = document.getElementById('app-nav');
    if (!nav) return;

    const raiz = pathParaRaiz();
    const cliente = pegarClienteLogado();
    const logado = estaLogado();

    let html = `<a href="${raiz}index.html">Habitat Express</a>`;

    if (logado) {
        html += `<a href="${raiz}html/produtos_catalogo.html">Catálogo</a>`;
        html += `<a href="${raiz}html/carrinho.html">Carrinho</a>`;
        html += `<a href="${raiz}html/meus_pedidos.html">Meus Pedidos</a>`;
        html += `<a href="${raiz}html/meu_endereco_cadastrar.html">Meus Endereços</a>`;

        if (cliente && cliente.tipoCliente === 'ADMIN') {
            html += `<a href="${raiz}html/admin_painel.html">Painel Admin</a>`;
        }

        html += `<span class="nav_usuario">Olá, ${cliente ? cliente.nome : ''}</span>`;
        html += `<button id="btn_sair" type="button">Sair</button>`;
    } else {
        html += `<a href="${raiz}html/produtos_catalogo.html">Catálogo</a>`;
        html += `<a href="${raiz}html/login.html">Entrar</a>`;
        html += `<a href="${raiz}html/cadastro_cliente.html">Criar Conta</a>`;
    }

    nav.innerHTML = html;

    const btnSair = document.getElementById('btn_sair');
    if (btnSair) {
        btnSair.addEventListener('click', () => {
            encerrarSessao();
            window.location.href = raiz + 'index.html';
        });
    }
}

document.addEventListener('DOMContentLoaded', montarNavGlobal);
