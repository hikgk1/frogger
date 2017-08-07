function Frog(descr) {
	this.setup(descr);

    this.vertStart = entityManager.models.beetModelLoc;
    this.vertNo = entityManager.models.beetModelNo;
}

Frog.prototype = new Entity();
Frog.prototype.cx = 0.0;
Frog.prototype.cy = 0.0;
Frog.prototype.cz = 10.0;
Frog.prototype.rotX = 90;
Frog.prototype.rotY = 0;
Frog.prototype.scale = vec3(1.0, 1.0, 1.0);
Frog.prototype.materialAmbient = vec4( 0.2, 0.5, 0.5, 1.0 );
Frog.prototype.materialDiffuse = vec4( 0.3, 0.8, 0.0, 1.0 );
Frog.prototype.materialSpecular = vec4( 1.0, 1.0, 1.0, 1.0 );
Frog.prototype.materialShininess = 50.0;
//Hversu lengi froskurinn er að færa sig 1 reit. Líka notað fyrir input delay eftir dauða og þegar maður kemst á endan
Frog.prototype.moveDelay = 30;
Frog.prototype.delay = 0;
Frog.prototype.moveX = 0;
Frog.prototype.moveY = 0;
Frog.prototype.score = 0;
Frog.prototype.lives = 3;
Frog.prototype.nextLife = 10;

Frog.prototype.update = function(du) {
	if(spatialManager.checkForDeath(this.cx, this.cy+2)) {
		this.cx = 0.0;
		this.cy = 0.0;
		this.moveX = 0;
		this.moveY = 0;
		this.delay = this.moveDelay;
		this.lives -= 1;
		if(this.lives <= 0) {
			g_gameOver = true;
			document.getElementById("Lives").innerHTML = "Lives: Game Over";
			return;
		}
	}

	var tmp = spatialManager.checkForFlies(this.cx, this.cy);
	if(tmp) {
		tmp.dead = true;
		this.score += 1;
	}

	//Komst á endan, færð stig, og ert sendur aftur á byrjun
	if(this.cy === 48) {
		this.cx = 0.0;
		this.cy = 0.0;
		this.moveX = 0;
		this.moveY = 0;
		this.delay = this.moveDelay;
		this.score += 10;
	}

	//Aukalíf fyrir að ganga vel
	if(this.score >= this.nextLife) {
		this.lives += 1;
		this.nextLife += 20;
	}

	document.getElementById("Score").innerHTML = "Score: " + this.score;
	document.getElementById("Lives").innerHTML = "Lives: " + this.lives;

	//Færir froskin skv upplýsingum frá spatialManager.riverspeed ef froskurinn er staðsettur á ánni
	if(this.cy === 28 || 
	   this.cy === 32 || 
	   this.cy === 36 || 
	   this.cy === 40 || 
	   this.cy === 44) this.cx += spatialManager.riverSpeed(this.cx, this.cy)*du;

	//Boundry check bara til öryggis. Kemst ekki út af leikborðinu
	if(this.cy > 48) this.cy = 48;
	if(this.cy < 0) this.cy = 0;
	if(this.cx > 24) this.cx = 24;
	if(this.cx < -24) this.cx = -24;

	//Færa froskin ef á að
	if(this.delay > 0) {
		this.delay -= du;
		this.cx += this.moveX*du/this.moveDelay;
		this.cy += this.moveY*du/this.moveDelay;
		//Stilla hluti rétt, því du er double
		if(this.delay < 0) {
			this.moveX = 0;
			this.moveY = 0;
			this.delay = 0;
			this.cx = Math.round(this.cx/4)*4;
			this.cy = Math.round(this.cy/4)*4;
		}
		return;
	}

	if(eatKey(KEY_W) && this.cy < 48) {
		this.moveY = 4;
		this.delay = this.moveDelay;
	} else if (eatKey(KEY_S) && this.cy > 0) {
		this.moveY = -4;
		this.delay = this.moveDelay;
	} else if (eatKey(KEY_A) && this.cx < 24) {
		this.moveX = 4;
		this.delay = this.moveDelay;
	} else if (eatKey(KEY_D) && this.cx > -24) {
		this.moveX = -4;
		this.delay = this.moveDelay;
	}
}