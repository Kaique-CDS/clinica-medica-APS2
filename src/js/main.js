import { initNavigation } from './navigation.js';
import { initEvents } from './events.js';

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initEvents();
    console.log('VitaCare - Aplicação e eventos inicializados.');
});
