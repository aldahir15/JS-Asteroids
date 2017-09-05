const Util = require('./util.js');
const MovingObject = require('./moving_object.js');

const DEFAULTS = {
  COLOR: "red",
  RADIUS: 25,
  SPEED: 0
};

const Ship = function(optionsObj) {
  MovingObject.call(this, {
    pos: optionsObj.game.randomPosition(),
    vel: Util.randomVec(DEFAULTS.SPEED),
    radius: DEFAULTS.RADIUS,
    color: DEFAULTS.COLOR,
    game: optionsObj.game
  });
};


Util.inherits(Ship, MovingObject);

Ship.prototype.power = function (impulse) {
  this.vel[0] += impulse[0];
  this.vel[1] += impulse[1];
};

module.exports = Ship;
