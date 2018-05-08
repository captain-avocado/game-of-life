const Grid = require('./grid');

console.dir(new Grid(36));

class Game {
  constructor(gridSize) {
    this.grid = new Grid(gridSize, true);
  }
  play() {
    return this.grid.compute().render();
  }
}

module.exports = Game;
