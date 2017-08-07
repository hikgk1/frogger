function Turtle(descr) {
	this.setup(descr);

    this.vertStart = entityManager.models.cowModelLoc;
    this.vertNo = entityManager.models.cowModelNo;

    this.speed = this.speed || this.speedDefault;

    this.diveLength = Math.random()*this.diveLength+240;
    this.dive = Math.random()*this.diveLength;
}

Turtle.prototype = new Entity();
Turtle.prototype.cx = 0.0;
Turtle.prototype.cy = 0.0;
Turtle.prototype.cz = 11.5;
Turtle.prototype.rotX = 90;
Turtle.prototype.rotY = 180;
Turtle.prototype.scale = vec3(1.0, 1.0, 1.0);
Turtle.prototype.materialAmbient = vec4( 0.2, 0.5, 0.5, 1.0 );
Turtle.prototype.materialDiffuse = vec4( 0.3, 0.8, 0.0, 1.0 );
Turtle.prototype.materialSpecular = vec4( 1.0, 1.0, 1.0, 1.0 );
Turtle.prototype.materialShininess = 50.0;
Turtle.prototype.speedDefault = 0.1;
Turtle.prototype.diveLength = 100;
Turtle.prototype.dive = 0;
Turtle.prototype.diving = false;

Turtle.prototype.update = function(du) {
	this.cx -= this.speed*du;

	if(this.diving) this.dive += (du*2);
    else this.dive += du;
	if(this.dive > this.diveLength) {
		this.dive = 0;
		this.diving = !this.diving;
		if(this.cz == 13) this.cz = 11.5;
		else this.cz = 13;
	}

	if(!this.diving || this.dive < this.diveLength*0.2) {
		spatialManager.riverLocation(this.cx-4, this.cy, -this.speed);
		spatialManager.riverLocation(this.cx, this.cy, -this.speed);
		spatialManager.riverLocation(this.cx+4, this.cy, -this.speed);
	}

	if (this.cx < -28) return entityManager.KILL_ME_NOW;
}

Turtle.prototype.render = function(mv) {
    var ambientProduct = mult(lightAmbient, this.materialAmbient);
    var diffuseProduct = mult(lightDiffuse, this.materialDiffuse);
    var specularProduct = mult(lightSpecular, this.materialSpecular);

    gl.uniform4fv( gl.getUniformLocation(program, "ambientProduct"), flatten(ambientProduct) );
    gl.uniform4fv( gl.getUniformLocation(program, "diffuseProduct"), flatten(diffuseProduct) );
    gl.uniform4fv( gl.getUniformLocation(program, "specularProduct"), flatten(specularProduct) );
    gl.uniform1f( gl.getUniformLocation(program, "shininess"), this.materialShininess );

    var mv1 = mult(mv, translate(this.cx-1, this.cy, this.cz));
    mv1 = mult(mv1, rotateX(this.rotX));
    mv1 = mult(mv1, rotateY(this.rotY));
    mv1 = mult(mv1, scalem(this.scale));

    var normalM = [
        vec3(mv1[0][0], mv1[1][0], mv1[2][0]),
        vec3(mv1[0][1], mv1[1][1], mv1[2][1]),
        vec3(mv1[0][2], mv1[1][2], mv1[2][2])
    ];

    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(mv1) );
    gl.uniformMatrix3fv(normalMatrixLoc, false, flatten(normalM) );

    gl.drawArrays( gl.TRIANGLES, this.vertStart, this.vertNo );

    //Þrjár skjaldbökur, vildi ekki þurfa búa til marga hluti, teikna þær bara 3x sinnum...
    var mv1 = mult(mv, translate(this.cx+2, this.cy, this.cz));
    mv1 = mult(mv1, rotateX(this.rotX));
    mv1 = mult(mv1, rotateY(this.rotY));
    mv1 = mult(mv1, scalem(this.scale));

    var normalM = [
        vec3(mv1[0][0], mv1[1][0], mv1[2][0]),
        vec3(mv1[0][1], mv1[1][1], mv1[2][1]),
        vec3(mv1[0][2], mv1[1][2], mv1[2][2])
    ];

    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(mv1) );
    gl.uniformMatrix3fv(normalMatrixLoc, false, flatten(normalM) );

    gl.drawArrays( gl.TRIANGLES, this.vertStart, this.vertNo );

    //Þrjár skjaldbökur, vildi ekki þurfa búa til marga hluti, teikna þær bara 3x sinnum...
    var mv1 = mult(mv, translate(this.cx-4, this.cy, this.cz));
    mv1 = mult(mv1, rotateX(this.rotX));
    mv1 = mult(mv1, rotateY(this.rotY));
    mv1 = mult(mv1, scalem(this.scale));

    var normalM = [
        vec3(mv1[0][0], mv1[1][0], mv1[2][0]),
        vec3(mv1[0][1], mv1[1][1], mv1[2][1]),
        vec3(mv1[0][2], mv1[1][2], mv1[2][2])
    ];

    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(mv1) );
    gl.uniformMatrix3fv(normalMatrixLoc, false, flatten(normalM) );

    gl.drawArrays( gl.TRIANGLES, this.vertStart, this.vertNo );
}