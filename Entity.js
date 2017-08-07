//Yfir "klasi" fyrir hluti í leiknum
function Entity() {

}

Entity.prototype.setup = function(descr) {
	for (var property in descr) {
        this[property] = descr[property];
    }
}

Entity.prototype.setPos = function(cx, cy) {
	this._cx = cx;
	this._cy = cy;
}

Entity.prototype.getPos = function() {
	return vec3(this.cx, this.cy, 10);
}

Entity.prototype.render = function(mv) {
    mv = mult(mv, translate(this.cx, this.cy, this.cz));
    mv = mult(mv, rotateX(this.rotX));
    mv = mult(mv, rotateY(this.rotY));
    mv = mult(mv, scalem(this.scale));

    var normalM = [
        vec3(mv[0][0], mv[1][0], mv[2][0]),
        vec3(mv[0][1], mv[1][1], mv[2][1]),
        vec3(mv[0][2], mv[1][2], mv[2][2])
    ];

    var ambientProduct = mult(lightAmbient, this.materialAmbient);
    var diffuseProduct = mult(lightDiffuse, this.materialDiffuse);
    var specularProduct = mult(lightSpecular, this.materialSpecular);

    gl.uniform4fv( gl.getUniformLocation(program, "ambientProduct"), flatten(ambientProduct) );
    gl.uniform4fv( gl.getUniformLocation(program, "diffuseProduct"), flatten(diffuseProduct) );
    gl.uniform4fv( gl.getUniformLocation(program, "specularProduct"), flatten(specularProduct) );
    gl.uniform1f( gl.getUniformLocation(program, "shininess"), this.materialShininess );

    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(mv) );
    gl.uniformMatrix3fv(normalMatrixLoc, false, flatten(normalM) );

    //vertStart og vertNo kemur frá hlutunum sem erfa frá þessum "klasa"
    gl.drawArrays( gl.TRIANGLES, this.vertStart, this.vertNo );
}