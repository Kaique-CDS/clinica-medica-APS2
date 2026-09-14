import { initNavigation } from './navigation.js';
import { initEvents } from './events.js';

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initEvents();
    console.log('VitaCare - Módulos de aplicação carregados com sucesso.');
});
