import {
    Engine,
    ArcRotateCamera,
    Color3,
    ShadowGenerator,
    Scene,
    Vector3,
    SceneLoader,
    HemisphericLight,
    DirectionalLight,
    /* MeshBuilder,
    StandardMaterial,
    VideoTexture,
    AnimationPropertiesOverride,
    Color4,
    PointerEventTypes,
    Mesh,*/
} from 'babylonjs';

export default async ( canvas ) => {
    const engine = new Engine( canvas, true, {
        preserveDrawingBuffer : true,
        stencil : true
    } );

    // Model by Mixamo
    engine.enableOfflineSupport = false;

    // This is really important to tell js to use decomposeLerp and matrix interpolation
    Animation.AllowMatricesInterpolation = true;

    var scene = new Scene( engine );

    var camera = new ArcRotateCamera( "camera1", Math.PI / 2, Math.PI / 4, 3, new Vector3( 0, 0.5, 0 ), scene );
    camera.attachControl( canvas, true );

    camera.lowerRadiusLimit = 2;
    camera.upperRadiusLimit = 10;
    camera.wheelDeltaPercentage = 0.01;

    var light = new HemisphericLight( "light1", new Vector3( 0, 1, 0 ), scene );
    light.intensity = 0.6;
    light.specular = Color3.Black();

    var light2 = new DirectionalLight( "dir01", new Vector3( 0, -0.5, -1.0 ), scene );
    light2.position = new Vector3( 0, 5, 5 );

    // Shadows
    var shadowGenerator = new ShadowGenerator( 1024, light2 );
    shadowGenerator.useBlurExponentialShadowMap = true;
    shadowGenerator.blurKernel = 32;

    engine.displayLoadingUI();

    SceneLoader.ImportMesh( "", "/", "huminoide.babylon", scene, function ( newMeshes ) {
        //var skeleton = skeletons[ 0 ];

        shadowGenerator.addShadowCaster( scene.meshes[ 0 ], true );
        newMeshes.forEach( ( mesh ) => {
            mesh.receiveShadows = false;
            mesh.scaling = new Vector3( 0.1, 0.1, 0.1 );
        } );
        for ( var index = 0; index < newMeshes.length; index++ ) {
            newMeshes[ index ].receiveShadows = false;
        }

        var helper = scene.createDefaultEnvironment( {
            enableGroundShadow : true
        } );
        helper.setMainColor( Color3.Random() );
        helper.ground.position.y += 0.01;

        // ROBOT
        // skeleton.animationPropertiesOverride = new AnimationPropertiesOverride();
        // skeleton.animationPropertiesOverride.enableBlending = true;
        // skeleton.animationPropertiesOverride.blendingSpeed = 0.05;
        // skeleton.animationPropertiesOverride.loopMode = 1;

        // var idleRange = skeleton.getAnimationRange( "YBot_Idle" );
        // var walkRange = skeleton.getAnimationRange( "YBot_Walk" );
        // var runRange = skeleton.getAnimationRange( "YBot_Run" );
        // var leftRange = skeleton.getAnimationRange( "YBot_LeftStrafeWalk" );
        // var rightRange = skeleton.getAnimationRange( "YBot_RightStrafeWalk" );

        // IDLE
        // if ( idleRange ) scene.beginAnimation( skeleton, idleRange.from, idleRange.to, true );
        // scene.beginAnimation( skeleton, 0, 0  );

        engine.hideLoadingUI();
    } );

    // run the render loop
    engine.runRenderLoop(function(){
        scene.render();
    });

    return engine;
}