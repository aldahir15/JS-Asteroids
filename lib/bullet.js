const MovingObject = require('./moving_object.js');
const Util = require('./util.js');

const Bullet = function(optionsObj) {
  MovingObject.call(this, {
    pos: optionsObj.game.ship[0].pos,
    vel: [0,0],
    radius: 5,
    color: 'red',
    game: optionsObj.game
  });
};


Util.inherits(Bullet, MovingObject);

Bullet.prototype.power = function (impulse) {
  this.vel[0] += impulse[0];
  this.vel[1] += impulse[1];
};

module.exports = Bullet;
