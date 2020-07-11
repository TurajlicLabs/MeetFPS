import Vue from 'vue';
// import PlayCanvas from 'playcanvas';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;
const $global = Vue.prototype.$global = window;
const $doc = Vue.prototype.$doc = document;
// polyfill for jQuary so that `lib-jitsi-meet/modules/xmpp/xmpp.js` can work properly
$global.$ = () => {
    const jQuaryPolyfill = {
        on( events, handler ) {
            events.split( ' ' ).forEach( ( event ) => {
                $global.addEventListener( event, handler );
            } );
        }
    };

    jQuaryPolyfill.find = ( selector ) => {
        let elements = $doc.querySelectorAll( selector );
        if ( elements.length > 1 ) {
            return elements;
        }
        else {
            // in case long find chains are being used.
            return Object.assign( elements[0], jQuaryPolyfill );
        }
    };

    return jQuaryPolyfill;
};

new Vue( {
    router,
    render: h => h( App )
} ).$mount( '#app' );
