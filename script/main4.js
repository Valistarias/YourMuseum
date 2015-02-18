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
var level=100;

//STEPS
var step=0;

//SAUVEGARDE DE HAUTEUR
var saveHigh=0;

//TEST DE POSIBILITE D'AFFICHAGE
var isPossible=0;

//TABLEAUX SUR LES MURS
var murs=0;

//TABLEAU DES TABLEAUX SUR LES MURS
var murtab=[];

//NOMBRE DE SALLE
var nbsalle=0;

//NOMBRE D'OBJET
var obj=[];

//NOMBRE DE TABLEAUX
var tableaux=[];

//ID TABLEAUX
var idtab=0;

//---------------------------------------------------
//---------------------------------------------------
// DIMENSIONS DES CADRES (PORTRAIT,PAYSAGE,CARRE)
var cadreWidth3D=[5.5,3.6,1.8,11,5,2.4,7,5,3];
var cadreHeight3D=[8,5.2,2.6,9,4,2,7,5,3];

// DIMENSIONS DES CADRES 3D (PORTRAIT,PAYSAGE,CARRE)
var scaleX=[0.55,0.36,0.18,1.1,0.5,0.24,0.7,0.5,0.3];
var scaleY=[0.8,0.52,0.26,0.9,0.4,0.2,0.7,0.5,0.3];

// ECART ENTRE LES TABLEAUX 2D
var margintot = 60;

// ECART ENTRE LES TABLEAUX 3D
var margin3D = 1;

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
//-------------------------------------------------------------------------------------------------

//--------------------------------------------VALUES 3D--------------------------------------------
//-------------------------------------------------------------------------------------------------
// PATTERN STATIQUE
// var pattern = [1,4,9,6,9,4,2,6,3,4,5,7,6,5,3,8,3,1,5,4,9,7,6,5,4,2,4,5,6,4,8,9,7,1,2,3,4,5,6];

// var nbsalle = 10;
var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);

//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------

//-------------------------------------------------------------------------------------------------
//--------------------------------------------FONCTION CREATEALL-----------------------------------
function createAll (pattern,valinit)
{
	//VALINIT -> POSITION OBSERVE DANS PATTERN
	if(valinit == null)
	{
		valinit=0;
	}
	// FIN DE LA BOUCLE, CONDITION DE SORTIE
	if(pattern.length==0)
	{
		createRoom(nbsalle);
		console.log('Done');
	}

	// SI VALINIT A ETE CREE, ON SE MET AU TRAVAIL
	else if(valinit != null)
	{
		// PREMIERE VALEUR DU OUTPUT -> CREATION DE LA SALLE D'INTRO
		if(valinit == 0 && step == 0 && tableaux.length == 0)
		{
			nbsalle=1;
		}

		// TYPE = TYPE DE CADRE ACTUEL
		var type=pattern[valinit].taille-1;
		var maxtaboftab=(murs*10)+idtab;
		//SI ON PEUT METTRE A LA SUITE
		if(maxvalueleft+cadreWidth3D[type]<18 && step==0)
		{
			// output += '<div class="cadre'+pattern[valinit]+'" id="idcadre'+pattern[valinit]+'" style="width:'+cadreWidth3D[type]+'px;height:'+cadreHeight3D[type]+'px;left:'+maxvalueleft+'px;top:'+maxvaluetop+'px"></div>';
			tableaux[maxtaboftab] = BABYLON.Mesh.CreateBox("tableau"+idtab, 10, scene);
		    tableaux[maxtaboftab].material = new BABYLON.StandardMaterial("Mat", scene);
		    tableaux[maxtaboftab].material.diffuseTexture = new BABYLON.Texture("textures/"+imgtabs[type], scene);
		    tableaux[maxtaboftab].material.bumpTexture = new BABYLON.Texture("textures/wallmodified.jpg", scene);
		    tableaux[maxtaboftab].material.diffuseTexture.hasAlpha = true;
		    tableaux[maxtaboftab].scaling = new BABYLON.Vector3(scaleX[type],scaleY[type],0.02);
		    tableaux[maxtaboftab].position = new BABYLON.Vector3(((-20*nbsalle)+10)-0.5-maxvalueleft-((scaleX[type]*10)/2)-margin3D,10-((scaleY[type]*10)/2)-0.5,0);

		    //Texte Principal
			var text = BABYLON.Mesh.CreatePlane("text", 6, scene, false);
			text.material = new BABYLON.StandardMaterial("text", scene);
			text.material.bumpTexture = new BABYLON.Texture("textures/wallmodified.jpg", scene);
			text.position = new BABYLON.Vector3(0, 0, 0);

			var textTexture = new BABYLON.DynamicTexture("dynamic texture", 512, scene, true);
			text.material.diffuseTexture = textTexture;

			textTexture.drawText(pattern[valinit].Nom, null, 500, "bold 15px verdana", "black", "#FFFFFF");
			text.position.x = tableaux[maxtaboftab].position.x;
			text.position.y = 10-cadreHeight3D[type]-1+3;
		   
		    if(murs%2==1 )
		    {
		    	tableaux[maxtaboftab].position.z=-9.5;
		    	tableaux[maxtaboftab].rotation.z=Math.PI;
		    	text.position.z =-9.489;
		    	text.rotation.y=Math.PI;
		    	// text.rotation.y=-Math.PI;
		    }
		    else
		    {
		    	tableaux[maxtaboftab].position.z=9.5;
		    	text.position.z =9.489;
		    }
		    tableaux[maxtaboftab].checkCollisions = true;
			
			if(cadreHeight3D[type]>cadreHeight3D[maxtype])
			{
				midtype=maxtype;
				maxtype=type;

				midpos=maxpos;
				maxpos=valinit;
			}
			else if(cadreHeight3D[type]>cadreHeight3D[midtype])
			{
				midtype=type;
				midpos=valinit;
			}


			// ON INCREMENTE LA VALEUR D'ELOIGNEMENT DU TABLEAU
			maxvalueleft += (scaleX[type]*10) + margin3D;

			//ET ON L'AJOUTE AU TABLEAU DES TABLEAUX TRAITES
			idtab++
			saveline.push(level+type);
		}
		else if(maxvalueleft+cadreWidth3D[type]<18 && maxvaluetop+cadreHeight3D[type]<8 && step==1 )
		{
			// output += '<div class="cadre'+pattern[valinit]+'" id="idcadre'+pattern[valinit]+'" style="width:'+cadreWidth3D[type]+'px;height:'+cadreHeight3D[type]+'px;left:'+maxvalueleft+'px;top:'+maxvaluetop+'px"></div>';
			tableaux[maxtaboftab] = BABYLON.Mesh.CreateBox("tableau"+idtab, 10, scene);
		    tableaux[maxtaboftab].material = new BABYLON.StandardMaterial("Mat", scene);
		    tableaux[maxtaboftab].material.diffuseTexture = new BABYLON.Texture("textures/"+imgtabs[type], scene);
		    tableaux[maxtaboftab].material.bumpTexture = new BABYLON.Texture("textures/wallmodified.jpg", scene);
		    tableaux[maxtaboftab].material.diffuseTexture.hasAlpha = true;
		    tableaux[maxtaboftab].scaling = new BABYLON.Vector3(scaleX[type],scaleY[type],0.02);
		    tableaux[maxtaboftab].position = new BABYLON.Vector3(((-20*nbsalle)+10)-0.5-maxvalueleft-((scaleX[type]*10)/2)-margin3D,10-maxvaluetop-((scaleY[type]*10)/2)-margin3D-0.5,0);
		    
		    //Texte Principal
			var text = BABYLON.Mesh.CreatePlane("text", 6, scene, false);
			text.material = new BABYLON.StandardMaterial("text", scene);
			text.material.bumpTexture = new BABYLON.Texture("textures/wallmodified.jpg", scene);
			text.position = new BABYLON.Vector3(0, 0, 0);

			var textTexture = new BABYLON.DynamicTexture("dynamic texture", 512, scene, true);
			text.material.diffuseTexture = textTexture;

			textTexture.drawText(pattern[valinit].Nom, null, 500, "bold 15px verdana", "black", "#FFFFFF");
			text.position.x = tableaux[maxtaboftab].position.x;
			text.position.y = 10-maxvaluetop-cadreHeight3D[type]-1+3-margin3D;

		    if(murs%2==1)
		    {
		    	tableaux[maxtaboftab].position.z=-9.5
		    	tableaux[maxtaboftab].rotation.z=Math.PI;
		    	text.position.z =-9.498;
		    	text.rotation.y=Math.PI;
		    }
		    else
		    {
		    	tableaux[maxtaboftab].position.z=9.5
		    	text.position.z =9.498;
		    }
		    tableaux[maxtaboftab].checkCollisions = true;

			// ON INCREMENTE LA VALEUR D'ELOIGNEMENT DU TABLEAU
			maxvalueleft += (scaleX[type]*10) + margin3D;

			//ET ON L'AJOUTE AU TABLEAU DES TABLEAUX TRAITES
			idtab++
			saveline.push(level+type);
		}

		else if(maxvalueleft-cadreWidth3D[type]>2.5 && maxvaluetop+cadreHeight3D[type]<8 && step==2)
		{
			console.log('test');
			// output += '<div class="cadre'+pattern[valinit]+'" id="idcadre'+pattern[valinit]+'" style="width:'+cadreWidth3D[type]+'px;height:'+cadreHeight3D[type]+'px;left:'+(maxvalueleft-cadreWidth3D[type])+'px;top:'+maxvaluetop+'px"></div>';
			tableaux[maxtaboftab] = BABYLON.Mesh.CreateBox("tableau"+idtab, 10, scene);
		    tableaux[maxtaboftab].material = new BABYLON.StandardMaterial("Mat", scene);
		    tableaux[maxtaboftab].material.diffuseTexture = new BABYLON.Texture("textures/"+imgtabs[type], scene);
		    tableaux[maxtaboftab].material.bumpTexture = new BABYLON.Texture("textures/wallmodified.jpg", scene);
		    tableaux[maxtaboftab].material.diffuseTexture.hasAlpha = true;
		    tableaux[maxtaboftab].scaling = new BABYLON.Vector3(scaleX[type],scaleY[type],0.02);
		    tableaux[maxtaboftab].position = new BABYLON.Vector3(((-20*nbsalle)+10)+0.5+((scaleX[type]*10)/2)-maxvalueleft+margin3D,10-maxvaluetop-((scaleY[type]*10)/2)-0.5-margin3D,0);
		    //Texte Principal
			var text = BABYLON.Mesh.CreatePlane("text", 6, scene, false);
			text.material = new BABYLON.StandardMaterial("text", scene);
			text.material.bumpTexture = new BABYLON.Texture("textures/wallmodified.jpg", scene);
			text.position = new BABYLON.Vector3(0, 0, 0);

			var textTexture = new BABYLON.DynamicTexture("dynamic texture", 512, scene, true);
			text.material.diffuseTexture = textTexture;

			textTexture.drawText(pattern[valinit].Nom, null, 500, "bold 15px verdana", "black", "#FFFFFF");
			text.position.x = tableaux[maxtaboftab].position.x;
			text.position.y = 10-maxvaluetop-cadreHeight3D[type]-1+3-margin3D;

		    if(murs%2==1)
		    {
		    	tableaux[maxtaboftab].position.z=-9.5
		    	tableaux[maxtaboftab].rotation.z=Math.PI;
		    	text.position.z =-9.499;
		    	text.rotation.y=Math.PI;
		    }
		    else
		    {
		    	tableaux[maxtaboftab].position.z=9.5
		    	text.position.z =9.499;
		    }

			// ON INCREMENTE LA VALEUR D'ELOIGNEMENT DU TABLEAU
			maxvalueleft -= ((scaleX[type]*10) + margin3D);

			//ET ON L'AJOUTE AU TABLEAU DES TABLEAUX TRAITES
			saveline.push(level+type);
			idtab++
		}

		//SNON, ON STOCKE DANS LE TABLEAU "REST"
		else if(maxvalueleft+cadreWidth3D[type]>=18 || maxvaluetop+cadreHeight3D[type]>=8)
		{
			rest.push(pattern[valinit]);
		}
		if(valinit==pattern.length-1 && step==0)
		{
			console.log();
			step=1;
			level+=10;
			pattern=rest;
			rest=[];
			maxvalueleft=0;
			for(var j=0;j<maxpos+1;j++)
			{
				maxvalueleft+=(cadreWidth3D[(saveline[j]%10)] + margin3D);
			}
			maxvaluetop+=cadreHeight3D[midtype];
			saveHigh=maxvaluetop;
			
			createAll(pattern,0);
		}

		else if(valinit==pattern.length-1 && step==1)
		{
			step=2;
			pattern=rest;
			rest=[];
			maxvalueleft=0;
			for(var j=0;j<maxpos+1;j++)
			{
				maxvalueleft+=(cadreWidth3D[(saveline[j]%10)] + margin3D);
			}
			maxvalueleft-= (cadreWidth3D[maxtype] - margin3D);

			createAll(pattern,0);
		}
		else if(valinit>=pattern.length-1 && step==2)
		{
			murtab.push(saveline);
			step=0;
			rest=[];
			saveline=[];
			valinit=0;
			idtab=0;
			maxvalueleft=0;
			maxvaluetop=0;
			maxtype=5;
			midtype=5;
			if(murs%2==1)
			{
				nbsalle+=1;
				murs+=1;
			}
			else
			{
				nbsalle=(murs/2)+1;
				murs+=1;
			}
			createAll(pattern,valinit);
		}
		else
		{
			createAll(pattern,valinit+1);
		}
		if(valinit == pattern.length && step==1)
		{
			
		}
	}
}
//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------

//-------------------------------------------------------------------------------------------------
//--------------------------------------------FONCTION CREATEROOM----------------------------------


function createRoom(nbsalle)
{
	//Texte Principale 
	var outputplane = BABYLON.Mesh.CreatePlane("outputplane", 8, scene, false);
	outputplane.material = new BABYLON.StandardMaterial("outputplane", scene);
	outputplane.material.bumpTexture = new BABYLON.Texture("textures/wallmodified.jpg", scene);
	outputplane.position = new BABYLON.Vector3(0, 0, 0);

	var outputplaneTexture = new BABYLON.DynamicTexture("dynamic texture", 512, scene, true);
	outputplane.material.diffuseTexture = outputplaneTexture;

	outputplaneTexture.drawText("Welcome to the Museum of", null, 500, "bold 25px verdana", "black", "#FFFFFF");
	outputplane.rotation.y=-Math.PI/2;
	outputplane.position.x=-9.49;
	outputplane.position.y=10;

	//Texte Nom
	var outputplane2 = BABYLON.Mesh.CreatePlane("outputplane2", 8, scene, false);
	outputplane2.material = new BABYLON.StandardMaterial("outputplane2", scene);
	outputplane2.material.bumpTexture = new BABYLON.Texture("textures/wallmodified.jpg", scene);
	outputplane2.position = new BABYLON.Vector3(0, 0, 0);

	var outputplane2Texture = new BABYLON.DynamicTexture("dynamic texture", 512, scene, true);
	outputplane2.material.diffuseTexture = outputplane2Texture;

	outputplane2Texture.drawText(tabs.artiste, null, 500, "bold 30px verdana", "black", "#FFFFFF");
	outputplane2.rotation.y=-Math.PI/2;
	outputplane2.position.x=-9.499;
	outputplane2.position.y=9;
	// Boucle for Magique
    for (var i = 0; i < nbsalle; i++) {
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
        
        if(i+1<nbsalle)
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
        
        else if(i+1==nbsalle)
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
    for (var i = 0; i < nbsalle; i++) {
        // ------------------------------------HITBOX--------------------------------
        // Our built-in 'box' shape. Params: name, subdivisions, size, scene
        obj[i.hitBox] = BABYLON.Mesh.CreateBox("crate", 20, scene);
        obj[i.hitBox].material = new BABYLON.StandardMaterial("Mat", scene);
        obj[i.hitBox].material.alpha = 0;

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
        if(i+1<nbsalle)
        obj[i.hitBox].actionManager.registerAction(new BABYLON.SetValueAction(
            { trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger, parameter: hitBox },
            scene.lights[i+1], "_isEnabled", 1));
        // --------------------------------------------------------------------------
    }
}
//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------

//--------------------------------------------CREATION DE LA SCENE---------------------------------
//-------------------------------------------------------------------------------------------------

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

    //Set the ellipsoid around the camera (e.g. player's size)
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

    createAll(tabs.tableaux);

// var scene = createScene();

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