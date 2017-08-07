function Tree(descr) {
	this.setup(descr);

    this.vertStart = entityManager.models.cubeModelLoc;
    this.vertNo = entityManager.models.cubeModelNo;

    this.speed = this.speed || this.speedDefault;

    this.scale = vec3(this.tLength*2-1, 1.6, 0.2);
}

Tree.prototype = new Entity();
Tree.prototype.cx = 0.0;
Tree.prototype.cy = 0.0;
Tree.prototype.cz = 11.0;
Tree.prototype.rotX = 0;
Tree.prototype.rotY = 0;
Tree.prototype.scale = vec3(2.0, 1.6, 0.2);
Tree.prototype.materialAmbient = vec4( 0.55, 0.27, 0.08, 1.0 );
Tree.prototype.materialDiffuse = vec4( 0.8, 0.3, 0.0, 1.0 );
Tree.prototype.materialSpecular = vec4( 1.0, 1.0, 1.0, 1.0 );
Tree.prototype.materialShininess = 50.0;
Tree.prototype.speedDefault = 0.05;
Tree.prototype.tLength = 2;

Tree.prototype.update = function(du) {
	this.cx += this.speed*du;

	//Til að þurfa ekki að vera með mismunandi hluti fyrir mismunandi lengdir á trjánum
	//Notar fall-through eiginleika switch! Ekki bæta inn break;
	switch(this.tLength) {
		case 4:
			spatialManager.riverLocation(this.cx+8, this.cy, this.speed);
			spatialManager.riverLocation(this.cx-8, this.cy, this.speed);
		case 2:
			spatialManager.riverLocation(this.cx-4, this.cy, this.speed);
			spatialManager.riverLocation(this.cx+4, this.cy, this.speed);
		default:
			spatialManager.riverLocation(this.cx, this.cy, this.speed);
	}
	

	if (this.cx > 27+(4*(this.tLength/2))) return entityManager.KILL_ME_NOW;
}