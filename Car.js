function Car(descr) {
	this.setup(descr);

    this.vertStart = entityManager.models.carModelLoc;
    this.vertNo = entityManager.models.carModelNo;

    this.speed = this.speed || this.speedDefault;
}

Car.prototype = new Entity();
Car.prototype.cx = 0.0;
Car.prototype.cy = 0.0;
Car.prototype.cz = 10.0;
Car.prototype.rotX = 90;
Car.prototype.rotY = 180;
Car.prototype.scale = vec3(1.0, 1.0, 1.0);
Car.prototype.materialAmbient = vec4( 0.1, 0.2, 0.8, 1.0 );
Car.prototype.materialDiffuse = vec4( 0.0, 0.8, 0.3, 1.0 );
Car.prototype.materialSpecular = vec4( 1.0, 1.0, 1.0, 1.0 );
Car.prototype.materialShininess = 50.0;
Car.prototype.speedDefault = 0.1;

Car.prototype.update = function(du) {
	this.cx -= this.speed*du;

	spatialManager.carLocation(this.cx, this.cy);

	if (this.cx < -26) return entityManager.KILL_ME_NOW;
}