var spatialManager = {
world: [],
wvert: [],
//Litir fyrir gras, veg og vatn
materialAmbient: [vec4( 0.0, 1.0, 0.0, 1.0 ),vec4( 0.3, 0.3, 0.3, 1.0 ),vec4( 0.0, 0.0, 1.0, 1.0 )],
materialDiffuse: [vec4( 0.0, 1.0, 0.0, 1.0 ),vec4( 0.3, 0.3, 0.3, 1.0 ),vec4( 0.0, 0.0, 1.0, 1.0 )],
materialSpecular: [vec4( 1.0, 1.0, 1.0, 1.0 ),vec4( 1.0, 1.0, 1.0, 1.0 ),vec4( 1.0, 1.0, 1.0, 1.0 )],
materialShininess: 1000,
scale: vec3(2.0, 2.0, 0.1),

init: function() {
	//Skilgreining heimsins. 0 = gras, 1 = vegur, 2 = vatn
	this.world = [
				  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
				  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
				  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
				  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
				  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
				  [2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2]
				 ];

	//Default skilgreining á hvar vatnið er fyrir death-mappið
	this.default = [
				  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				  [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1]
				 ];

	//Notað til að merkja hvaða reitir froskurinn deyr ef hann er á
	this.death = [
				  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				  [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1]
				 ];

	//Notað til að segja til um hversu hratt froskurinn á að ferðast upp/niður ánna
	this.river = [
				  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
				 ];

	//Heldur utan um hvar flugur eru
	this.flies = [
				  [null, null, null, null, null, null, null, null, null, null, null, null, null],
				  [null, null, null, null, null, null, null, null, null, null, null, null, null],
				  [null, null, null, null, null, null, null, null, null, null, null, null, null],
				  [null, null, null, null, null, null, null, null, null, null, null, null, null],
				  [null, null, null, null, null, null, null, null, null, null, null, null, null],
				  [null, null, null, null, null, null, null, null, null, null, null, null, null],
				  [null, null, null, null, null, null, null, null, null, null, null, null, null],
				  [null, null, null, null, null, null, null, null, null, null, null, null, null],
				  [null, null, null, null, null, null, null, null, null, null, null, null, null],
				  [null, null, null, null, null, null, null, null, null, null, null, null, null],
				  [null, null, null, null, null, null, null, null, null, null, null, null, null],
				  [null, null, null, null, null, null, null, null, null, null, null, null, null],
				  [null, null, null, null, null, null, null, null, null, null, null, null, null]
				 ];

	//Hefði kanski bara átt að setja þetta allt í 1 matrix með öllum upplýsingunum í anonymous objecti

	//Nota kassa modelið til að teikna jörðina
	this.vertStart = entityManager.models.cubeModelLoc;
    this.vertNo = entityManager.models.cubeModelNo;
},

update: function(du) {
	for(var i = 0; i < this.death.length; i++) {
		for(var j = 0; j < this.death[i].length; j++) {
			this.death[i][j] = this.default[i][j];
		}
	}
},

checkForDeath: function(x, y) {
	var tmp = this.death[Math.floor(y/4)][Math.floor((x+26)/4)];
	if(g_debug) this.death[Math.floor(y/4)][Math.floor((x+26)/4)] = 2;
	return tmp;
},

carLocation: function(x, y) {
	this.death[Math.floor(y/4)][Math.floor((x+25)/4)] = 1;
},

truckLocation: function(x, y) {
	this.death[Math.floor(y/4)][Math.floor((x+27)/4)] = 1;
},

riverLocation: function(x, y, d) {
	this.death[Math.floor(y/4)][Math.floor((x+25)/4)] = 0;
	this.river[Math.floor(y/4)][Math.floor((x+25)/4)] = d;
},

riverSpeed: function(x, y) {
	return this.river[Math.floor(y/4)][Math.floor((x+25)/4)];
},

registerFly: function(x, y, o) {
	this.flies[Math.floor(y/4)][Math.floor((x+25)/4)] = o;
},

unregisterFly: function(x, y) {
	this.flies[Math.floor(y/4)][Math.floor((x+25)/4)] = null;
},

checkForFlies: function(x, y) {
	return this.flies[Math.floor(y/4)][Math.floor((x+25)/4)];
},

render: function(mv) {
	for(var i = 0; i < this.world.length; i++) {
		for(var j = 0; j < this.world[i].length; j++) {
			this.renderTile(mv, i, j);
		}
	}
},

renderTile: function(mv, a, b) {
	mv = mult(mv, translate(b*4-(6*4), a*4, 11.2));
    mv = mult(mv, scalem(this.scale));

    var normalM = [
        vec3(mv[0][0], mv[1][0], mv[2][0]),
        vec3(mv[0][1], mv[1][1], mv[2][1]),
        vec3(mv[0][2], mv[1][2], mv[2][2])
    ];

    //Fyrir debug render, til að sjá hvar froskurinn er, hvar allir hinir hlutirnir eru, og hvar froskurinn deyr
    if(this.death[a][b] == 1 && g_debug) {
    	var ambientProduct = mult(lightAmbient, vec4( 1.0, 0.0, 0.0, 1.0 ));
    	var diffuseProduct = mult(lightDiffuse, vec4( 1.0, 0.0, 0.0, 1.0 ));
    	var specularProduct = mult(lightSpecular, vec4( 1.0, 1.0, 1.0, 1.0 ));
    } else if(this.death[a][b] == 2 && g_debug) {
    	var ambientProduct = mult(lightAmbient, vec4( 1.0, 1.0, 0.0, 1.0 ));
    	var diffuseProduct = mult(lightDiffuse, vec4( 1.0, 1.0, 0.0, 1.0 ));
    	var specularProduct = mult(lightSpecular, vec4( 1.0, 1.0, 1.0, 1.0 ));
    } else {
    	var ambientProduct = mult(lightAmbient, this.materialAmbient[this.world[a][b]]);
    	var diffuseProduct = mult(lightDiffuse, this.materialDiffuse[this.world[a][b]]);
    	var specularProduct = mult(lightSpecular, this.materialSpecular[this.world[a][b]]);
    }

    gl.uniform4fv( gl.getUniformLocation(program, "ambientProduct"), flatten(ambientProduct) );
    gl.uniform4fv( gl.getUniformLocation(program, "diffuseProduct"), flatten(diffuseProduct) );
    gl.uniform4fv( gl.getUniformLocation(program, "specularProduct"), flatten(specularProduct) );
    gl.uniform1f( gl.getUniformLocation(program, "shininess"), this.materialShininess );

    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(mv) );
    gl.uniformMatrix3fv(normalMatrixLoc, false, flatten(normalM) );

    gl.drawArrays( gl.TRIANGLES, this.vertStart, this.vertNo );
}

}