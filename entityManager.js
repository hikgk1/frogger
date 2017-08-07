var entityManager = {
_categories: [],
_lanes: [],
_flies: [],
_frog: [],
//Skilgreining á return gildi fyrir hluti sem vilja láta henda sér úr listunum
KILL_ME_NOW: -1,
models: {},

init: function() {
	this._frog.push(new Frog());
	this.frog = this._frog[0];
    this._lanes.push(new Lane({lineNo: 1, objectType: Car, startPoint: 24, pattern: [1, 0, 0, 1, 0, 0, 1, 0, 0, 0]}));
    this._lanes.push(new Lane({lineNo: 2, objectType: Truck, startPoint: -24, pattern: [1, 0, 0, 0, 1, 0], speed: 0.2}));
    this._lanes.push(new Lane({lineNo: 3, objectType: Truck, startPoint: -24, pattern: [0, 1, 0, 0, 1, 0, 0, 1, 0]}));
    this._lanes.push(new Lane({lineNo: 4, objectType: Car, startPoint: 24, pattern: [1, 0, 1, 0, 1, 0, 0, 0]}));
    this._lanes.push(new Lane({lineNo: 5, objectType: Car, startPoint: 24, speed: 0.15}));
    this._lanes.push(new Lane({lineNo: 6, objectType: Fly, startPoint: 0, pattern: [0, 0, 0, 0, 0, 1]}));
    this._lanes.push(new Lane({lineNo: 7, objectType: Turtle, startPoint: 24}));
    this._lanes.push(new Lane({lineNo: 8, objectType: Tree, startPoint: -24, tLength: 2, pattern: [0, 1, 0, 1, 0, 1, 0]}));
    this._lanes.push(new Lane({lineNo: 9, objectType: Tree, startPoint: -24, tLength: 4, pattern: [0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1], speed: 0.08}));
    this._lanes.push(new Lane({lineNo: 10, objectType: Turtle, startPoint: 24}));
    this._lanes.push(new Lane({lineNo: 11, objectType: Tree, startPoint: -24, tLength: 4}));
    this._lanes.push(new Lane({lineNo: 12, objectType: Fly, startPoint: 4, pattern: [0, 0, 1, 0, 0, 0]}));

	this._categories.push(this._lanes);
	this._categories.push(this._flies);
    this._categories.push(this._frog);
},

update: function(du) {
    for (var c = 0; c < this._categories.length; ++c) {
        var aCategory = this._categories[c];
        var i = 0;

        while (i < aCategory.length) {
            var status = aCategory[i].update(du);

            if (status === this.KILL_ME_NOW) {
                aCategory.splice(i,1);
            } else {
                i++;
            }
        }
    }

    if(eatKey("K".charCodeAt(0))) g_debug = !g_debug;
},

render: function(mv) {
    for (var c = 0; c < this._categories.length; ++c) {
        var aCategory = this._categories[c];

        for (var i = 0; i < aCategory.length; ++i) {
            aCategory[i].render(mv);
        }
    }
}

}