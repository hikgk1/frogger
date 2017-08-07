//Endurnotað update fall úr tölvuleikaforritunarkúrsi
//Smá breytt fyrir þennan leik

var NOMINAL_UPDATE_INTERVAL = 16.666;

function update(dt) {
    
    // Warn about very large dt values -- they may lead to error
    //
    if (dt > 200) {
        dt = NOMINAL_UPDATE_INTERVAL;
    }
    
    // If using variable time, divide the actual delta by the "nominal" rate,
    // giving us a conveniently scaled "du" to work with.
    //
    var du = (dt / NOMINAL_UPDATE_INTERVAL);
    
    updateSimulation(du);
}