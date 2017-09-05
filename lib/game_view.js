const Ship = require('./ship.js');

function GameView(game, ctx) {
  this.game = game;
  this.ctx = ctx;
  this.ship = this.game.addShip();
}

GameView.prototype.start = function(){
  setInterval(() => {
    this.game.draw(this.ctx);
    this.game.step();
    this.game.removeBullets();
  }, 20);
};

GameView.prototype.bindKeyHandlers = function () {
  const ship = this.ship;
  let shootdir = [5,0];
  console.log(Ship.prototype);
  key('w', function() { ship.power([0,-0.5]);
                        shootdir = [0, -5]});
  key('a', function() {
    ship.power([-0.5,0]);
    shootdir = [-5, 0];
  });
  key('s', function() {
    ship.power([0,0.5]);
    shootdir = [0, 5];
  });
  key('d', function() {
    ship.power([0.5,0]);
    shootdir = [5, 0];
  });
  key('space', () => {
    const bullet = this.game.addBullet();
    bullet.vel = shootdir;
  });

};

module.exports = GameView;
