const Grid = require('./grid');

class Game {
  constructor(gridSize) {
    this.grid = new Grid(gridSize, true);
  }
  play() {
    //chaining-style вызов методов
    return this.grid.compute().render();
  }
}

module.exports = Game;
