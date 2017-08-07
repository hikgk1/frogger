function Truck(descr) {
	this.setup(descr);

    this.vertStart = entityManager.models.truckModelLoc;
    this.vertNo = entityManager.models.truckModelNo;

    this.speed = this.speed || this.speedDefault;
}

Truck.prototype = new Entity();
Truck.prototype.cx = 0.0;
Truck.prototype.cy = 0.0;
Truck.prototype.cz = 10.0;
Truck.prototype.rotX = 180;
Truck.prototype.rotY = 0;
Truck.prototype.scale = vec3(1.5, 1.5, 1.5);
Truck.prototype.materialAmbient = vec4( 0.5, 0.1, 0.2, 1.0 );
Truck.prototype.materialDiffuse = vec4( 0.8, 0.3, 0.0, 1.0 );
Truck.prototype.materialSpecular = vec4( 1.0, 1.0, 1.0, 1.0 );
Truck.prototype.materialShininess = 10.0;
Truck.prototype.speedDefault = 0.1;

Truck.prototype.update = function(du) {
	this.cx += this.speed*du;

	spatialManager.truckLocation(this.cx, this.cy);

	if (this.cx > 26) return entityManager.KILL_ME_NOW;
}