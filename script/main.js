var rooms = 10;
var canvas = document.getElementById("renderCanvas");
        var engine = new BABYLON.Engine(canvas, true);

        var createScene = function () {

    var obj=[];

    // This creates a Babylon Scene object (not a shape/mesh)
    var scene = new BABYLON.Scene(engine);
    
    // This creates and positions an free camera
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -5), scene);

    // This attaches the camera to the canvas
    camera.attachControl(canvas, false);
    camera.speed = 0.5;

    // Enable Collisions
    scene.collisionsEnabled = true;

    //Then apply collisions and gravity to the active camera
    camera.checkCollisions = true;
    camera.applyGravity = true;

    //Set the ellipsoid around the camera (e.g. your player's size)
    camera.ellipsoid = new BABYLON.Vector3(1, 1, 1);
    
    var hitBox = BABYLON.Mesh.CreateBox("crate", 2, scene);
    hitBox.material = new BABYLON.StandardMaterial("Mat", scene);
    hitBox.material.diffuseTexture = new BABYLON.Texture("textures/crate.png", scene);
    hitBox.material.bumpTexture = new BABYLON.Texture("textures/crate_normal.jpg", scene);
    hitBox.material.diffuseTexture.hasAlpha = true;

    hitBox.parent = camera;

    // Wall Material
    var mateWall = new BABYLON.StandardMaterial("wallMat", scene);
    mateWall.bumpTexture = new BABYLON.Texture("textures/wallmodified.jpg", scene);

    // Boucle for Magique
    for (var i = 0; i < rooms; i++) {
        // ------------------------------------LIGHT--------------------------------
        obj[i.light] = new BABYLON.PointLight("dir01", new BABYLON.Vector3(-i*20, 3, 0), scene);
        obj[i.light].specular = new BABYLON.Color3(0, 0, 0);
        obj[i.light].intensity = 1;
        obj[i.light].range = 30;
        obj[i.light]._isEnabled=0;
        // --------------------------------------------------------------------------

        // ------------------------------------WALLS---------------------------------
        if(i==0)
        {
            // Wall 3
            obj[i.murfond] = BABYLON.Mesh.CreateBox("wallL3", 10, scene);
            obj[i.murfond].material = mateWall;
            obj[i.murfond].scaling.y = 1;
            obj[i.murfond].scaling.z = 2;
            obj[i.murfond].scaling.x = 0.1;
            obj[i.murfond].position.x = 10;
            obj[i.murfond].position.y = 5;
            obj[i.murfond].checkCollisions = true;
        }

        // Our built-in 'ground' shape.  
        obj[i.ground] = BABYLON.Mesh.CreateBox("ground", 20, scene);
        obj[i.ground].position.y=-10
        obj[i.ground].material = new BABYLON.StandardMaterial("groundMat", scene);
        obj[i.ground].material.diffuseTexture = new BABYLON.Texture("textures/ground.jpg", scene);
        obj[i.ground].material.bumpTexture = new BABYLON.Texture("textures/groundnormal.jpg", scene);
        obj[i.ground].material.diffuseTexture.hasAlpha = true;
        obj[i.ground].position.x=-i*20;
        obj[i.ground].checkCollisions = true;
    
        // Our roof.  
        obj[i.roof] = BABYLON.Mesh.CreateBox("top", 20, scene);
        obj[i.roof].material = mateWall;
        obj[i.roof].position.y=20;
        obj[i.roof].position.x=-i*20;

        // Wall 1
        obj[i.wall1] = BABYLON.Mesh.CreateBox("wallL", 10, scene);
        obj[i.wall1].material = mateWall;
        obj[i.wall1].scaling.x = 2;
        obj[i.wall1].scaling.z = 0.1;
        obj[i.wall1].position.z = 10;
        obj[i.wall1].position.y = 5;
        obj[i.wall1].position.x=-i*20;
        obj[i.wall1].checkCollisions = true;

        // Wall 2
        obj[i.wall2] = BABYLON.Mesh.CreateBox("wallL2", 10, scene);
        obj[i.wall2].material = mateWall;
        obj[i.wall2].scaling.x = 2;
        obj[i.wall2].scaling.z = 0.1;
        obj[i.wall2].position.z = -10;
        obj[i.wall2].position.y = 5;
        obj[i.wall2].position.x=-i*20;
        obj[i.wall2].checkCollisions = true;
        
        if(i+1<rooms)
        {
           // Wall 4
            obj[i.wall4] = BABYLON.Mesh.CreateBox("wallL4", 10, scene);
            obj[i.wall4].material = mateWall;
            obj[i.wall4].scaling.y = 1;
            obj[i.wall4].scaling.z = 0.8;
            obj[i.wall4].scaling.x = 0.1;
            obj[i.wall4].position.x = -10+(-i*20);
            obj[i.wall4].position.y = 5;
            obj[i.wall4].position.z = 6;
            obj[i.wall4].checkCollisions = true;

            // Wall 5
            obj[i.wall5] = BABYLON.Mesh.CreateBox("wallL5", 10, scene);
            obj[i.wall5].material = mateWall;
            obj[i.wall5].scaling.y = 1;
            obj[i.wall5].scaling.z = 0.8;
            obj[i.wall5].scaling.x = 0.1;
            obj[i.wall5].position.x = -10+(-i*20);
            obj[i.wall5].position.y = 5;
            obj[i.wall5].position.z = -6;
            obj[i.wall15].checkCollisions = true;

            // Wall 6
            obj[i.wall6] = BABYLON.Mesh.CreateBox("wallL6", 10, scene);
            obj[i.wall6].material = mateWall;
            obj[i.wall6].scaling.y = 0.8;
            obj[i.wall6].scaling.z = 0.4;
            obj[i.wall6].scaling.x = 0.1;
            obj[i.wall6].position.x = -10+(-i*20);
            obj[i.wall6].position.y = 8;
            obj[i.wall6].position.z = 0;
            obj[i.wall16].checkCollisions = true; 
        }
        
        else if(i+1==rooms)
        {
            // Wall 3
            obj[i.murfond] = BABYLON.Mesh.CreateBox("wallL3", 10, scene);
            obj[i.murfond].material = mateWall;
            obj[i.murfond].scaling.y = 1;
            obj[i.murfond].scaling.z = 2;
            obj[i.murfond].scaling.x = 0.1;
            obj[i.murfond].position.x = -10+(-i*20);
            obj[i.murfond].position.y = 5;
            obj[i.murfond].checkCollisions = true;
        }
        // --------------------------------------------------------------------------

    };
    // Boucle for Magique
    // for (var i = 0; i < rooms; i++) {
    //     // ------------------------------------HITBOX--------------------------------
    //     // Our built-in 'box' shape. Params: name, subdivisions, size, scene
    //     obj[i.hitBox] = BABYLON.Mesh.CreateBox("crate", 20, scene);
    //     obj[i.hitBox].material = new BABYLON.StandardMaterial("Mat", scene);
    //     obj[i.hitBox].material.alpha = 0;

    //     // // Move the hitBox 
    //     // hitBox.position.y = 1;
    //     // hitBox.position.x = -8;
    //     // hitBox.position.z = -8;

    //     // Move the box 
    //     obj[i.hitBox].position.y = 0;
    //     obj[i.hitBox].position.x = -i*20;
    //     obj[i.hitBox].position.z = 0;

    //     //Action Testing - Thanks GLADoS

    //     obj[i.hitBox].actionManager = new BABYLON.ActionManager(scene);

    //     obj[i.hitBox].actionManager.registerAction(new BABYLON.SetValueAction(
    //         { trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger, parameter: hitBox },
    //         scene.lights[i], "_isEnabled", 1));
    //     obj[i.hitBox].actionManager.registerAction(new BABYLON.SetValueAction(
    //         { trigger: BABYLON.ActionManager.OnIntersectionExitTrigger, parameter: hitBox },
    //         scene.lights[i], "_isEnabled", 0));
    //     // --------------------------------------------------------------------------
    // }
    
    // Shadows
    var shadowGenerator = new BABYLON.ShadowGenerator(4096, light);
    shadowGenerator.getShadowMap().renderList.push(box);
    shadowGenerator.useVarianceShadowMap = true;

    ground.receiveShadows = true;

    // Leave this function
    return scene;
};

        
var scene = createScene();

engine.runRenderLoop(function () {
    scene.render();
});

// Resize
window.addEventListener("resize", function () {
    engine.resize();
});

document.addEventListener("mousedown", activateclick);
document.addEventListener("mouseup", desactivateclick);

function activateclick(){
    document.body.style.cursor = 'none';
}

function desactivateclick(){
    document.body.style.cursor = 'default';
}
// Resize
window.addEventListener("resize", function () {
    engine.resize();
}); 