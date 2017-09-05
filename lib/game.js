const Asteroid = require('./asteroid.js');
const Util = require('./util.js');
const Ship = require('./ship.js');
const Bullet = require('./bullet.js');

function Game() {
  this.asteroids = [];
  this.addAsteroids();
  this.ship = [];
  this.bullets = [];
}


Game.DIM_X = 1000;
Game.DIM_Y = 600;
Game.NUM_ASTEROIDS = 7;
// Game.allObjects = Game.allObjects || Game.allObjects();

Game.prototype.randomPosition = function(){
  return [
  Game.DIM_X * Math.random(),
  Game.DIM_Y * Math.random()
  ];
};

Game.prototype.addShip = function () {
  const ship = new Ship({
    pos: this.randomPosition(),
    game: this
  });

  this.ship.push(ship);
  return ship;
};

Game.prototype.addBullet = function () {
  const bullet = new Bullet({
    game: this
  });
  this.bullets.push(bullet);
  return bullet;
};

Game.prototype.addAsteroids = function() {
  for (let i = 0; i < Game.NUM_ASTEROIDS; i++) {
    this.asteroids.push(new Asteroid({
      pos: this.randomPosition(),
      game: this
    }));
  }
};

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  this.allObjects().forEach((asteroid) => {
    asteroid.draw(ctx);
  });
};

Game.prototype.moveObjects = function () {
  this.allObjects().forEach((asteroid) => {
    asteroid.move();
  });
};

Game.prototype.wrap = function (pos) {
  return [
    Util.wrap(pos[0], Game.DIM_X),
    Util.wrap(pos[1], Game.DIM_Y)
  ];
};

Game.prototype.checkCollisions = function () {
  for (var i = 0; i < this.allObjects().length; i++) {
    for (var j = 0; j < this.allObjects().length; j++) {
      if (i === j) {
        continue;
      } else {
        const collided =
          this.allObjects()[i].isCollidedWith(this.allObjects()[j]);
        if (collided) {
          if (this.allObjects()[i] instanceof Ship || this.allObjects()[j] instanceof Ship ) {
            if (this.allObjects()[i] instanceof Asteroid || this.allObjects()[j] instanceof Asteroid ) {
              this.ship[0].pos = this.randomPosition();
              this.ship[0].vel = [0, 0];
              this.asteroids.splice(i, 1);
              this.asteroids.splice(j - 1, 1);
              this.bullets = [];
            }
          } else if (this.allObjects()[i] instanceof Bullet || this.allObjects()[j] instanceof Bullet) {
            if (this.allObjects()[i] instanceof Asteroid || this.allObjects()[j] instanceof Asteroid ) {
              this.asteroids.splice(i, 1);
              this.asteroids.splice(j - 1, 1);
              this.bullets.shift();
            }
          }
          // if (i === this.allObjects().length - 1 ||
          //     j === this.allObjects().length - 1) {
          //   this.ship[0].pos = this.randomPosition();
          //   this.ship[0].vel = [0, 0];
          // }
          // this.asteroids.splice(i, 1);
          // this.asteroids.splice(j - 1, 1);
        }
      }
    }
  }
};

Game.prototype.step = function () {
  this.moveObjects();
  this.checkCollisions();
};

Game.prototype.allObjects = function () {
  if (this.ship) {
    return this.asteroids.concat(this.ship, this.bullets);
  } else {
    return this.asteroids;
  }
};

Game.prototype.isOutOfBounds = function(pos) {
  if (pos[0] > Game.DIM_X || pos[1] > Game.DIM_Y) {
    return true;
  }
  return false;
};

Game.prototype.removeBullets = function() {
  this.bullets.forEach((bullet) => {
    if (this.isOutOfBounds(bullet.pos)) {
      this.bullets.shift();
    }
  });
};

module.exports = Game;
