function Fly(descr) {
	this.setup(descr);

    this.vertStart = entityManager.models.dolphModelLoc;
    this.vertNo = entityManager.models.dolphModelNo;

    spatialManager.registerFly(this.cx, this.cy, this);
}

Fly.prototype = new Entity();
Fly.prototype.cx = 0.0;
Fly.prototype.cy = 0.0;
Fly.prototype.cz = 10.0;
Fly.prototype.rotX = 90;
Fly.prototype.rotY = 0;
Fly.prototype.scale = vec3(0.2, 0.2, 0.2);
Fly.prototype.materialAmbient = vec4( 0.0, 0.0, 0.0, 1.0 );
Fly.prototype.materialDiffuse = vec4( 0.0, 0.0, 0.0, 1.0 );
Fly.prototype.materialSpecular = vec4( 1.0, 1.0, 1.0, 1.0 );
Fly.prototype.materialShininess = 50.0;
Fly.prototype.ttl = 300;
Fly.prototype.dead = false;

Fly.prototype.update = function(du) {
	this.ttl -= du;
	if(this.ttl < 0 || this.dead) {
		spatialManager.unregisterFly(this.cx, this.cy);
		return entityManager.KILL_ME_NOW;
	}
}