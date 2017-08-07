var KEY_W = "W".charCodeAt(0);
var KEY_A = "A".charCodeAt(0);
var KEY_S = "S".charCodeAt(0);
var KEY_D = "D".charCodeAt(0);

var keys = [];

function handleKeydown(evt) {
    keys[evt.keyCode] = true;
}

function handleKeyup(evt) {
    keys[evt.keyCode] = false;
}

function eatKey(keyCode) {
    var isDown = keys[keyCode];
    keys[keyCode] = false;
    return isDown;
}