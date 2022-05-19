game.play = {
  game: game,
  keycom: {
    '38': [0, -1],
    '40': [0, 1],
    '37': [-1, 0],
    '39': [1, 0]
  },
  sx: null,
  sy: null,
  dx: null,
  dy: null,
  ex: null,
  ey: null,

  onTouchStart(event) {
    canvas.addEventListener('touchstart', (event) => {
      let touch = event.touches[0];
      game.play.sx = touch.clientX, game.play.sy = touch.clientY;
    })
  },
  onTouchMove(event) {
    canvas.addEventListener('touchmove', (event) => {
      let touch = event.touches[0];
      game.play.ex = touch.clientX, game.play.ey = touch.clientY;
      game.play.dx = game.play.ex - game.play.sx, game.play.dy = game.play.ey - game.play.sy;
      event.preventDefault();
    })
  },
  onTouchEnd(event) {
    canvas.addEventListener('touchend', (event) => {
      if (game.play.dy < -50 && Math.abs(game.play.dy / game.play.dx) > 2) game.move([0, -1]);
      if (game.play.dy > 50 && Math.abs(game.play.dy / game.play.dx) > 2) game.move([0, 1]);
      if (game.play.dx < -50 && Math.abs(game.play.dx / game.play.dy) > 2) game.move([-1, 0]);
      if (game.play.dx > 50 && Math.abs(game.play.dx / game.play.dy) > 2) game.move([1, 0]);
    })
  },
  onKeyDown() {
    document.onkeydown = function (e) {
      game.dir = game.play.keycom[(e ? e : event).keyCode];
      game.move(game.dir);
      console.log(game.dir);
    };
  },
  reload() {
    document.getElementById("btn").addEventListener("click", () => {
      game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
      game.emptyCells = 16;
      game.score = 0;
      game.draw.map = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ];
      document.getElementById("score").innerText = "Score: " + String(game.score);
      game.draw.block();
      game.start();
    });
  }
};