class Cell {
  constructor(row, col, alive = false) {
    //свойства с нижним подчеркиванием подразумеваются как приватные, тк в js нельзя просто скрыть свойства, данный способ используется в качестве защиты внутренних данных и обеспечения инкапсуляции
    this._row = row;
    this._col = col;
    this._alive = alive;
  } 

  //геттеры для скрытых данных
  get row() {
    return this._row;
  }

  get col() {
    return this._col;
  }

  get isAlive() {
    return this._alive;
  }

  //методы для удобства работы с классом
  die() {
    this._alive = false;
  }

  live() {
    this._alive = true;
  }

}

module.exports = Cell;
