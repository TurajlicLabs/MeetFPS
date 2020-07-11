import config from '@/config/jitisConfig';
const { JitsiConnection, logLevels, setLogLevel } = window.JitsiMeetJS;

export default async function( roomName ) {
    // @TODO: figure how to use websocket instead of BOSH, for both development and prod.
    config.serverUrl = config.bosh = `/http-bind?room=${roomName}`;

    setLogLevel( logLevels.ERROR );
    let jConnect = new JitsiConnection( null, '', config );
    // Gets initial params for Jitsi connection
    // gets jitsi rid, jid and sid
    let response = await fetch( `/http-pre-bind?room=${roomName}` );
    let options = JSON.parse( await response.text() );
    jConnect.attach( options );

    let conference = jConnect.initJitsiConference( roomName, {
        openBridgeChannel: true
    } );
}
