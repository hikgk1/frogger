var canvas;
var gl;

var index = 0;

var program;

var vertices = [];
var normals = [];

var movement = false;     // Do we rotate?
var spinX = 0;
var spinY = 0;
var origX;
var origY;

var zDist = -5.0;

var fovy = 60.0;
var near = 0.2;
var far = 100.0;

var lightPosition = vec4(1.0, 1.0, 1.0, 0.0 );
var lightAmbient = vec4(1.0, 1.0, 1.0, 1.0 );
var lightDiffuse = vec4( 1.0, 1.0, 1.0, 1.0 );
var lightSpecular = vec4( 1.0, 1.0, 1.0, 1.0 );

var ctm;
var ambientColor, diffuseColor, specularColor;

var modelViewMatrix, projectionMatrix;
var modelViewMatrixLoc, projectionMatrixLoc;

var normalMatrix, normalMatrixLoc;

var eye = vec3(0.0, -15.0, -10.0);
var at = vec3(0.0, 0.0, 10.0);
var up = vec3(0.0, 1.0, 0.0);


window.onload = function init() {
	init3D();
	entityManager.init();
	spatialManager.init();
	main.init();
}

function updateSimulation(du) {
	spatialManager.update();
	entityManager.update(du);
	//Passar að leikmaður horfi alltaf fyrir ofan og aftan froskinn
	at = entityManager.frog.getPos();
	eye = vec3(at[0], at[1]-15, -10.0);
}

function renderSimulation() {
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    modelViewMatrix = lookAt( eye, at, up );

    spatialManager.render(modelViewMatrix);

    entityManager.render(modelViewMatrix);

    window.requestAnimFrame(mainIterFrame);
}