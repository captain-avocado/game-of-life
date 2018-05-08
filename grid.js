const Cell = require('./cell');

class Grid {

  constructor(size, randomize = false) {
    this.size = size;

    //логика инициализации НЕ свойств по возможности должна быть вынесена вне конструктора в отедльный метод init()
    this.init(randomize);
  }

  init(randomize) {
    //инициализация масива данным способом помогает создать пустой массив определенного размера
    this.cells = new Array(this.size);

    for (let i = 0; i < this.size; i++) {
      this.cells[i] = new Array(this.size);

      for (let j = 0; j < this.size; j++) {
        if (randomize) {
          let isAlive = Math.random() < .5;

          this.cells[i][j] = new Cell(i, j, isAlive);
        } else {
          this.cells[i][j] = new Cell(i, j);
        }

      }
    }
  }

  

}

module.exports = Grid;
