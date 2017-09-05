const Util = require('./util.js');
const MovingObject = require('./moving_object.js');

const DEFAULTS = {
  COLOR: "#505050",
  RADIUS: 25,
  SPEED: 4
};

// new Asteroid({ pos: [30, 30] });
const Asteroid = function(optionsObj) {
  MovingObject.call(this, {
    pos: optionsObj.pos,
    vel: Util.randomVec(DEFAULTS.SPEED),
    radius: DEFAULTS.RADIUS,
    color: DEFAULTS.COLOR,
    game: optionsObj.game
  });
};

Util.inherits(Asteroid, MovingObject);


module.exports = Asteroid;
