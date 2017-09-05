const MovingObject = require('./lib/moving_object.js');
const Game = require('./lib/game.js');
const GameView = require('./lib/game_view.js');


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
