//Setur upp fyrir 3D og eventListeners fyrir lyklaborð
function init3D() {
	canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.9, 1.0, 1.0, 1.0 );

    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);

    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("keyup", handleKeyup);

    //////////////////////////////////////////////////////

    // get model
    var PR = PlyReader();

    //Frog model
    entityManager.models.beetModelLoc = vertices.length;
    var plyData = PR.read("./PLY/beethoven-n.ply");
    entityManager.models.beetModelNo = plyData.points.length;
    vertices = vertices.concat(plyData.points);
    normals = normals.concat(plyData.normals);

    //Turtle model
    entityManager.models.cowModelLoc = vertices.length;
    plyData = PR.read("./PLY/cow-n.ply");
    entityManager.models.cowModelNo = plyData.points.length;
    vertices = vertices.concat(plyData.points);
    normals = normals.concat(plyData.normals);
    
    //Car model
    entityManager.models.carModelLoc = vertices.length;
    plyData = PR.read("./PLY/big_porsche.ply");
    entityManager.models.carModelNo = plyData.points.length;
    vertices = vertices.concat(plyData.points);
    normals = normals.concat(plyData.normals);
    
    //Truck model
    entityManager.models.truckModelLoc = vertices.length;
    plyData = PR.read("./PLY/pickup_big.ply");
    entityManager.models.truckModelNo = plyData.points.length;
    vertices = vertices.concat(plyData.points);
    normals = normals.concat(plyData.normals);
    
    //Tree model
    entityManager.models.cubeModelLoc = vertices.length;
    plyData = PR.read("./PLY/cube.ply");
    entityManager.models.cubeModelNo = plyData.points.length;
    vertices = vertices.concat(plyData.points);
    normals = normals.concat(plyData.normals);

    //Fly model
    entityManager.models.dolphModelLoc = vertices.length;
    plyData = PR.read("./PLY/dolphins.ply");
    entityManager.models.dolphModelNo = plyData.points.length;
    vertices = vertices.concat(plyData.points);
    normals = normals.concat(plyData.normals);

    /*var myTeapot = teapot(15);
    myTeapot.scale(0.5, 0.5, 0.5);

    vertices = myTeapot.TriangleVertices;
    normals = myTeapot.Normals;*/


    //////////////////////////////////////////////////////

    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    
    // normals array attribute buffer
    var nBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, nBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(normals), gl.STATIC_DRAW );

    var vNormal = gl.getAttribLocation( program, "vNormal" );
    gl.vertexAttribPointer( vNormal, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vNormal );

    
    // vertex array attribute buffer
    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );


    modelViewMatrixLoc = gl.getUniformLocation( program, "modelViewMatrix" );
    projectionMatrixLoc = gl.getUniformLocation( program, "projectionMatrix" );
    normalMatrixLoc = gl.getUniformLocation( program, "normalMatrix" );

    projectionMatrix = perspective( fovy, 1.0, near, far );
    gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix) );

    gl.uniform4fv( gl.getUniformLocation(program, "lightPosition"), flatten(lightPosition) );
}