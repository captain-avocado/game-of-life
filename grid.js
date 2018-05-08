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

  isNeighborAlive(row, col) {
    if (!this.cells[row] || !this.cells[col]) return false;

    let cell = this.cells[row][col];
    
    return cell && cell.isAlive;
  }

  countNeighbors(cell) {
    let count = 0;
    let {row, col} = cell;

    if (this.isNeighborAlive(row - 1, col - 1)) count++;
    if (this.isNeighborAlive(row - 1, col)) count++;
    if (this.isNeighborAlive(row - 1, col + 1)) count++;
    if (this.isNeighborAlive(row, col - 1)) count++;
    if (this.isNeighborAlive(row, col + 1)) count++;
    if (this.isNeighborAlive(row + 1, col - 1)) count++;
    if (this.isNeighborAlive(row + 1, col)) count++;
    if (this.isNeighborAlive(row + 1, col + 1)) count++;

    return count;
  }

  //методы - функции, которые принадлежат объекту и изменяют состояние объекта
  compute() {
    let nextGrid = new Grid(this.size);

    for (let i = 0; i < nextGrid.size; i++) {
      for (let j = 0; j < nextGrid.size; j++) {
        let cell = this.cells[i][j];
        let nextCell = nextGrid.cells[i][j];
        //приватный метод, чтобы вынести логику в отдельную функцию и не загромождать данный метод
        let numNeighbors = this.countNeighbors(cell);

        if (cell.isAlive) {
          if (numNeighbors < 2) {
            nextCell.die();
          } else if (numNeighbors === 2 || numNeighbors === 3) {
            nextCell.live();
          } else if (numNeighbors > 3) {
            nextCell.die();
          }
        } else {
          if (numNeighbors === 3) {
            nextCell.live();
          }
        }
      }
    }

    this.cells = nextGrid.cells;

    return this;
  }

  render() {
    let output = '';

    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        let cell = this.cells[i][j];

        if (cell.isAlive) {
          output += ' 💥 ';
        } else {
          output += '   ';
        }

        if (cell.col === this.size - 1) {
          output += '\r\n';
        }
      }
    }

    return output;
  }

}

module.exports = Grid;
