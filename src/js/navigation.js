// Módulo de controle de navegação e abas
export function initNavigation() {
    window.mudarAba = function(evt, abaId) {
        const abas = document.getElementsByClassName("aba");
        for (let i = 0; i < abas.length; i++) {
            abas[i].classList.remove("active");
        }
        const btns = document.getElementsByClassName("btn-tab");
        for (let i = 0; i < btns.length; i++) {
            btns[i].classList.remove("active");
        }
        document.getElementById(abaId).classList.add("active");
        evt.currentTarget.classList.add("active");
    };

    window.mudarSubAba = function(evt, subId) {
        const subs = document.getElementsByClassName("sub-painel");
        for (let i = 0; i < subs.length; i++) {
            subs[i].classList.remove("active");
        }
        const btns = document.getElementsByClassName("sub-btn");
        for (let i = 0; i < btns.length; i++) {
            btns[i].classList.remove("active");
        }
        document.getElementById(subId).classList.add("active");
        evt.currentTarget.classList.add("active");
    };
}
