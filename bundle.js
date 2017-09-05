/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(1);
const Game = __webpack_require__(2);
const GameView = __webpack_require__(5);


const mo = new MovingObject(
  { pos: [30, 30], vel: [10, 10], radius: 5, color: "#00FF00"}
);

document.addEventListener('DOMContentLoaded', function() {
  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;
  const ctx = canvasEl.getContext("2d");
  // mo.draw(canvasEl.getContext("2d"));
  // mo.move();
  // mo.draw(canvasEl.getContext("2d"));

  const game = new Game();
  const gameview = new GameView(game, ctx);
  gameview.start();
  gameview.bindKeyHandlers();

});


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(4);


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


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Asteroid = __webpack_require__(3);
const Util = __webpack_require__(4);
const Ship = __webpack_require__(6);
const Bullet = __webpack_require__(7);

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


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(4);
const MovingObject = __webpack_require__(1);

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


/***/ }),
/* 4 */
/***/ (function(module, exports) {

const Util = {
  randomVec (length) {
    const deg = 2 * Math.PI * Math.random();
    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  },
  // Scale the length of a vector by the given amount.
  scale (vec, m) {
    return [vec[0] * m, vec[1] * m];
  },

  inherits (childClass, parentClass) {
    childClass.prototype = Object.create(parentClass.prototype);
  },

  wrap (coord, max) {
    if (coord < 0) {
      return max - (coord % max);
    } else if (coord > max) {
      return coord % max;
    } else {
      return coord;
    }
  },

  dist(pos1, pos2) {
    return Math.sqrt(((pos1[0] - pos2[0]) * (pos1[0] - pos2[0]))
    + ((pos1[1] - pos2[1]) * (pos1[1] - pos2[1])));
  }
};

module.exports = Util;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const Ship = __webpack_require__(6);

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


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(4);
const MovingObject = __webpack_require__(1);

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


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(1);
const Util = __webpack_require__(4);

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


/***/ })
/******/ ]);