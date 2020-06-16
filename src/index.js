import 'spectre.css/dist/spectre.css';
import 'spectre.css/dist/spectre-exp.css';
import 'spectre.css/dist/spectre-icons.css';
import '@public/index.html';

import { createEventDispatcher } from 'svelte';
import App from '@/App.svt';

if ( !( 'MFPS' in window ) ) {
    window.MFPS = {};
    MFPS.global = window;
    MFPS.doc = MFPS.global.document;
}

MFPS.global.addEventListener("DOMContentLoaded", () => {
    MFPS.createEventDispatcher = createEventDispatcher;

    const app = new App( {
        target: MFPS.doc.querySelector( '#app' ),
    } );

    MFPS.env = { app };
} );
