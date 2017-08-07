//Lane manager fyrir hlut af tagi sem er vísað í í objectType
function Lane(descr) {
	for (var property in descr) {
        this[property] = descr[property];
    }

    this._entities = [];
    this._descriptor;
    this._timer = this.delay;
    this._i = 0;

    switch(this.objectType) {
    	case Car:
    		this._descriptor = {cx: this.startPoint, cy: 4*this.lineNo, speed: this.speed};
    		break;
    	case Truck:
    		this._descriptor = {cx: this.startPoint, cy: 4*this.lineNo, speed: this.speed};
    		break;
    	case Fly:
    		this.newEntity = this.newFlyEntity;
    		break;
    	case Turtle:
    		this._descriptor = {cx: this.startPoint, cy: 4*this.lineNo, speed: this.speed};
    		break;
    	case Tree:
    		this.delay = 120;
    		this._descriptor = {cx: this.startPoint, cy: 4*this.lineNo, speed: this.speed, tLength: this.tLength};
    		break;
    }
}

Lane.prototype.lineNo = 1;
Lane.prototype.startPoint = 24;
Lane.prototype.objectType = Car;
Lane.prototype.delay = 60;
Lane.prototype.pattern = [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0];

Lane.prototype.update = function(du) {
	var i = 0;

    while (i < this._entities.length) {
		var status = this._entities[i].update(du);

		if (status === entityManager.KILL_ME_NOW) {
            this._entities.splice(i,1);
		} else {
			++i;
        }
    }

    //Timer vinnur lane í gegnum patternið. Býr til nýja hluti skv því
    this._timer -= du;
    if(this._timer <= 0) {
    	if(this.pattern[this._i] == 1) {
    		this.newEntity();
    	}
    	this._i = (this._i+1)%this.pattern.length;
    	this._timer = this.delay;
    }
}

Lane.prototype.render = function(mv) {
	for(var i = 0; i < this._entities.length; i++) {
		this._entities[i].render(mv);
	}
}

Lane.prototype.newEntity = function() {
	this._entities.push(new this.objectType(this._descriptor));
}

//Sér fyrir flugurnar, bara til að vera viss um að þær fái alltaf random staðsetningu
Lane.prototype.newFlyEntity = function() {
	var tmp = Math.round(Math.random()*12)*4-24;
	var tmp2 = Math.random()*300+120;
	this._descriptor = {cx: tmp, cy: 4*this.lineNo, ttl: tmp2};
	this._entities.push(new this.objectType(this._descriptor));
}