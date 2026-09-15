// Módulo de controle de navegação de abas e sub-abas
export function initNavigation() {
    window.mudarAba = function(evt, abaId) {
        if (evt && evt.preventDefault) evt.preventDefault();
        
        const abas = document.querySelectorAll(".aba");
        abas.forEach(aba => aba.classList.remove("active"));
        
        const btns = document.querySelectorAll(".btn-tab");
        btns.forEach(btn => btn.classList.remove("active"));
        
        const abaAlvo = document.getElementById(abaId);
        if (abaAlvo) {
            abaAlvo.classList.add("active");
        }
        
        if (evt && evt.currentTarget) {
            evt.currentTarget.classList.add("active");
        }
    };

    window.mudarSubAba = function(evt, subId) {
        if (evt && evt.preventDefault) evt.preventDefault();
        
        // Remove 'active' de todos os sub-paineis
        const subs = document.querySelectorAll(".sub-painel");
        subs.forEach(sub => {
            sub.classList.remove("active");
            sub.style.display = "none"; // Garante ocultacao explicita
        });
        
        // Remove 'active' de todos os botoes de sub-aba
        const btns = document.querySelectorAll(".sub-btn");
        btns.forEach(btn => btn.classList.remove("active"));
        
        // Exibe o sub-painel selecionado
        const subAlvo = document.getElementById(subId);
        if (subAlvo) {
            subAlvo.classList.add("active");
            subAlvo.style.display = "block"; // Garante exibicao explicita
        }
        
        // Marca o botao como ativo
        if (evt && evt.currentTarget) {
            evt.currentTarget.classList.add("active");
        }
    };
}
