const Util = require('./util.js');


const MovingObject = function(optionsObject) {
  this.pos = optionsObject.pos;
  this.vel = optionsObject.vel;
  this.radius = optionsObject.radius;
  this.color = optionsObject.color;
  this.game = optionsObject.game;
};

MovingObject.prototype.draw = function (ctx) {
  ctx.beginPath();
  ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2*Math.PI, false);
  ctx.fillStyle = this.color;
  ctx.fill();
};

MovingObject.prototype.move = function () {
  let dx = this.vel[0];
  let dy = this.vel[1];
  if (this.radius === 5) {
    this.pos = [this.pos[0] + dx, this.pos[1] + dy];
  } else {
    this.pos = [this.pos[0] + dx, this.pos[1] + dy];
    this.pos = this.game.wrap(this.pos);
  }
};

MovingObject.prototype.isCollidedWith = function (otherObject) {
  const dis = Util.dist(this.pos, otherObject.pos);
  if (dis < (this.radius + otherObject.radius)) {
    return true;
  }
  return false;
};

// -----test-----

// const mo = new MovingObject(
//   { pos: [30, 30], vel: [10, 10], radius: 5, color: "#00FF00"}
// );


module.exports = MovingObject;
