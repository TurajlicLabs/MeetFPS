<template>
    <div class="home">
        <canvas @resize="engine.resize()" ref="canvas"></canvas>
    </div>
</template>

<script>
    import Engine from '@/engine';
    /* eslint-disable */
    const { JitsiConnection } = JitsiMeetJS;

    const ROOM = 'superspecificroomfortesting';
    // const BOSH_URL = `"//alpha.jitsi.net/http-bind?room=${ ROOM }`;

    export default {
        name : 'Home',
        data() {
            return {
                engine : null
            }
        },
        async mounted() {
            let canvas = this.$refs[ 'canvas' ];
            this.engine = await Engine( canvas, this );
            this.connect();
        },
        methods : {
            async connect() {
                let configModule = await import( '@/config/jitisConfig' );
                const config = configModule.default;
                let domain = config.hosts.domain;
                config.serverUrl = config.bosh = `/http-bind?room=${ROOM}`;

                let jConnect = new JitsiConnection( null, '', config );
                console.log( jConnect );
                let response = await fetch( `/http-pre-bind?room=${ROOM}` );
                let options = JSON.parse( await response.text() );
                jConnect.attach( options );
            }
        }
    }
</script>

<style scoped>
    canvas {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
    }
</style>