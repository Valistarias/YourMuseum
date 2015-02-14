//--------------------------------------------VALUES TABLEAUX--------------------------------------
//-------------------------------------------------------------------------------------------------

//VALEURS DYNAMIQUES DE GESTION DES TABLEAUX (TABLEAUX A AFFICHER, TABLEAUX RESTANTS)
var rest=[];
var saveline=[];

// MAX & MID, POSITIONS DES VALEURS
var maxpos=0;
var midpos=0;

// MAX & MID, TYPE DE CARRE
var maxtype=5;
var midtype=5;

//LEVELS
var level=10;

//STEPS
var step=0;

//SAUVEGARDE DE HAUTEUR
var saveHigh=0;

//TEST DE POSIBILITE D'AFFICHAGE
var isPossible=0;

//TABLEAUX SUR LES MURS
var murs=[];

//NOMBRE DE SALLE
var nbsalle=0;

//---------------------------------------------------
//---------------------------------------------------
// DIMENSIONS DES CADRES (PORTRAIT,PAYSAGE,CARRE) 2D
var cadreWidth=[300,200,100,600,260,130,350,250,150];
var cadreHeight=[400,260,130,450,200,100,350,250,150];

// DIMENSIONS DES CADRES 3D (PORTRAIT,PAYSAGE,CARRE)
var scaleX=[0.55,0.36,0.18,1.1,0.5,0.24,0.64,0.45,0.27];
var scaleY=[0.8,0.52,0.26,0.9,0.4,0.2,0.7,0.5,0.3];

// ECART ENTRE LES TABLEAUX 2D
var margintot = 60;

// ECART ENTRE LES TABLEAUX 3D
var margintot3D = 0.5;

//LIENS DES IMAGES
var imgtabs=["test0.jpg","test1.jpg","test2.jpg","test3.jpg","test4.jpg","test5.jpg","test6.jpg","test7.jpg","test8.jpg","test9.jpg"];
//---------------------------------------------------
//---------------------------------------------------

// VALEURS DYNAMIQUES DE TAILLES MAX
var maxvalueleft=0;
var maxvaluetop=0;

// OUTPUT = VALEUR CREE EN HTML/CSS
var output = '';

// SUM MAGIC TRICKS (MLG NOSCOPE 720)
var self=this;
//-------------------------------------------------------------------------------------------------


// PATTERN STATIQUE
var pattern = [4,6,6,9,4,2,6,3,4,5,7,6,5,3,8,3,1,5,4,9,7,6,5,4,2];

// var rooms = 10;
var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);
var tableaux=[];
var tablcount=0;

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


    // var light = new BABYLON.SpotLight("Spot0", new BABYLON.Vector3(0, 30, -10), new BABYLON.Vector3(0, -1, 0), 0.8, 2, scene);
    // light.intensity = 1;

    // // Shadows
    // var shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
    // shadowGenerator.useVarianceShadowMap = true;

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
            obj[i.murfond].receiveShadows = true;
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
            obj[i.wall5].checkCollisions = true;

            // Wall 6
            obj[i.wall6] = BABYLON.Mesh.CreateBox("wallL6", 10, scene);
            obj[i.wall6].material = mateWall;
            obj[i.wall6].scaling.y = 0.8;
            obj[i.wall6].scaling.z = 0.4;
            obj[i.wall6].scaling.x = 0.1;
            obj[i.wall6].position.x = -10+(-i*20);
            obj[i.wall6].position.y = 8;
            obj[i.wall6].position.z = 0;
            obj[i.wall6].checkCollisions = true; 
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
        }
        // --------------------------------------------------------------------------

    };
    // Boucle for Magique
    for (var i = 0; i < rooms; i++) {
        // ------------------------------------HITBOX--------------------------------
        // Our built-in 'box' shape. Params: name, subdivisions, size, scene
        obj[i.hitBox] = BABYLON.Mesh.CreateBox("crate", 20, scene);
        obj[i.hitBox].material = new BABYLON.StandardMaterial("Mat", scene);
        obj[i.hitBox].material.alpha = 0;

        // // Move the hitBox 
        // hitBox.position.y = 1;
        // hitBox.position.x = -8;
        // hitBox.position.z = -8;

        // Move the box 
        obj[i.hitBox].position.y = 0;
        obj[i.hitBox].position.x = -i*20;
        obj[i.hitBox].position.z = 0;

        //Action Testing - Thanks GLADoS

        obj[i.hitBox].actionManager = new BABYLON.ActionManager(scene);

        obj[i.hitBox].actionManager.registerAction(new BABYLON.SetValueAction(
            { trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger, parameter: hitBox },
            scene.lights[i], "_isEnabled", 1));
        obj[i.hitBox].actionManager.registerAction(new BABYLON.SetValueAction(
            { trigger: BABYLON.ActionManager.OnIntersectionExitTrigger, parameter: hitBox },
            scene.lights[i], "_isEnabled", 0));
        if(i+1<rooms)
        obj[i.hitBox].actionManager.registerAction(new BABYLON.SetValueAction(
            { trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger, parameter: hitBox },
            scene.lights[i+1], "_isEnabled", 1));
        // --------------------------------------------------------------------------
    }

    // Leave this function
    return scene;
};

var scene = createScene();

construct (pattern);

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


// //--------------------------------------------INIT (USELESS)---------------------------------------
// // function init ()
// // {
// //     construct(pattern);
// //     document.querySelector("#main").innerHTML = output;
// // }
// //-------------------------------------------------------------------------------------------------


//--------------------------------------------CONSTRUCT--------------------------------------------
function construct (pattern,valinit)
{
    // BASE DE LA BOUCLE -> CREATION DE VALINIT
    if(valinit == null)
    {
        valinit=0;
    }

    // tableaux[1] = BABYLON.Mesh.CreateBox("tableau1", 10, scene);
    // tableaux[1].material = new BABYLON.StandardMaterial("Mat", scene);
    // tableaux[1].material.diffuseTexture = new BABYLON.Texture("textures/"+imgtabs[5], scene);
    // tableaux[1].material.bumpTexture = new BABYLON.Texture("textures/wallmodified.jpg", scene);
    // tableaux[1].material.diffuseTexture.hasAlpha = true;
    // tableaux[1].scaling = new BABYLON.Vector3(scaleX[3],scaleY[3],0.02);
    // tableaux[1].position = new BABYLON.Vector3(-20-0.5-0.5+(10-((scaleX[3]*10)/2)) ,10-((scaleY[3]*10)/2)-0.5,-9.5);
    // tableaux[1].checkCollisions = true;

    // tableaux[2] = BABYLON.Mesh.CreateBox("tableau2", 10, scene);
    // tableaux[2].material = new BABYLON.StandardMaterial("Mat", scene);
    // tableaux[2].material.diffuseTexture = new BABYLON.Texture("textures/"+imgtabs[6], scene);
    // tableaux[2].material.bumpTexture = new BABYLON.Texture("textures/wallmodified.jpg", scene);
    // tableaux[2].material.diffuseTexture.hasAlpha = true;
    // tableaux[2].scaling = new BABYLON.Vector3(scaleX[1],scaleY[1],0.02);
    // tableaux[2].position = new BABYLON.Vector3(-20-0.5-0.5+ (10-((scaleX[3]*10))) - ((scaleX[1]*10)/2) -0.5,10-((scaleY[1]*10)/2)-0.5,-9.5);
    // tableaux[2].checkCollisions = true;

    // FIN DE LA BOUCLE, CONDITION DE SORTIE
    if(isPossible == 2)
    {
    }

    // SI VALINIT A ETE CREE, ON SE MET AU TRAVAIL
    else if(valinit != null)
    {
        // PREMIERE VALEUR DU OUTPUT
        // if(valinit == 0 && step == 0)
        // {
        //     output += '<div id="centers">';
        // }

        // TYPE = TYPE DE CADRE ACTUEL
        var type=pattern[valinit]-1;

        //SI ON PEUT METTRE A LA SUITE
        if(maxvalueleft+cadreWidth[type]<1100 && step==0)
        {
            output += '<div class="cadre'+pattern[valinit]+'" id="idcadre'+pattern[valinit]+'" style="width:'+cadreWidth[type]+'px;height:'+cadreHeight[type]+'px;left:'+maxvalueleft+'px;top:'+maxvaluetop+'px"></div>';
            
            if(cadreHeight[type]>cadreHeight[maxtype])
            {
                midtype=maxtype;
                maxtype=type;

                midpos=maxpos;
                maxpos=valinit;
            }
            else if(cadreHeight[type]>cadreHeight[midtype])
            {
                midtype=type;
                midpos=valinit;
            }


            // ON INCREMENTE LA VALEUR D'ELOIGNEMENT DU TABLEAU
            maxvalueleft += cadreWidth[type] + margintot;

            //ET ON L'AJOUTE AU TABLEAU DES TABLEAUX TRAITES
            saveline.push(level+pattern[valinit]);
        }

        else if(maxvalueleft+cadreWidth[type]<1100 && maxvaluetop+cadreHeight[type]<500 && step==1 )
        {
            output += '<div class="cadre'+pattern[valinit]+'" id="idcadre'+pattern[valinit]+'" style="width:'+cadreWidth[type]+'px;height:'+cadreHeight[type]+'px;left:'+maxvalueleft+'px;top:'+maxvaluetop+'px"></div>';
            
            if(cadreHeight[type] + saveHigh>cadreHeight[maxtype])
            {
                midtype=maxtype;
                maxtype=type;

                midpos=maxpos;
                maxpos=valinit;
            }
            else if(cadreHeight[type] + saveHigh>cadreHeight[midtype])
            {
                midtype=type;
                midpos=valinit;
            }


            // ON INCREMENTE LA VALEUR D'ELOIGNEMENT DU TABLEAU
            maxvalueleft += cadreWidth[type] + margintot;

            //ET ON L'AJOUTE AU TABLEAU DES TABLEAUX TRAITES
            saveline.push(level+pattern[valinit]);
        }

        else if(maxvalueleft-cadreWidth[type]>0 && maxvaluetop+cadreHeight[type]<500 && step==2)
        {
            output += '<div class="cadre'+pattern[valinit]+'" id="idcadre'+pattern[valinit]+'" style="width:'+cadreWidth[type]+'px;height:'+cadreHeight[type]+'px;left:'+(maxvalueleft-cadreWidth[type])+'px;top:'+maxvaluetop+'px"></div>';
            
            if(cadreHeight[type] + saveHigh>cadreHeight[maxtype])
            {
                midtype=maxtype;
                maxtype=type;

                midpos=maxpos;
                maxpos=valinit;
                
            }
            else if(cadreHeight[type] + saveHigh>cadreHeight[midtype])
            {
                midtype=type;
                midpos=valinit;
            }

            // ON INCREMENTE LA VALEUR D'ELOIGNEMENT DU TABLEAU
            maxvalueleft -= cadreWidth[type] + margintot;

            //ET ON L'AJOUTE AU TABLEAU DES TABLEAUX TRAITES
            saveline.push(level+pattern[valinit]);
        }

        //SNON, ON STOCKE DANS LE TABLEAU "REST"
        else if(maxvalueleft+cadreWidth[type]>=1100 || maxvaluetop+cadreHeight[type]>=500)
        {
            rest.push(pattern[valinit]);
        }

        if(valinit==pattern.length && step==0)
        {
            step=1;
            level+=10
            pattern=rest;
            rest=[];
            maxvalueleft=0;
            for(var j=0;j<maxpos+1;j++)
            {
                maxvalueleft+=cadreWidth[(saveline[j]%10)-1] + margintot;
            }
            maxvaluetop+=cadreHeight[midtype] + margintot;
            saveHigh=maxvaluetop;
            
            construct(pattern,0);
        }

        else if(valinit==pattern.length && step==1)
        {
            step=2;
            pattern=rest;
            rest=[];
            maxvalueleft=0;
            for(var j=0;j<maxpos+1;j++)
            {
                maxvalueleft+=cadreWidth[(saveline[j]%10)-1] + margintot;
            }
            maxvalueleft-= margintot*2 + cadreWidth[maxtype];
            construct(pattern,0);
        }

        else if(valinit>=pattern.length && step==2)
        {
            console.log(pattern);
        }
        else
        {
            construct(pattern,valinit+1);
        }
        if(valinit == pattern.length && step==1)
        {
            output += '</div>';
        }
    }
}
//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------