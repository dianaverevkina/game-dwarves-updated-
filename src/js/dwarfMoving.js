export default class DwarfMoving {
  constructor(board) {
    this.board = board;
    this.dwarf = null;
  }

  createDwarf() {
    this.dwarf = document.createElement('div');
    this.dwarf.classList.add('board__char', 'dwarf');
    this.dwarf.innerHTML = '<img src="./images/goblin.png" alt="dwarf" class="dwarf__img">';

    this.startMovingDwarf();
  }

  startMovingDwarf() {
    const firstCell = this.getRandomCell();
    this.cellWithDwarf = firstCell;
    this.cellWithDwarf.append(this.dwarf);

    this.moveDwarfInterval = setInterval(() => {
      this.moveDwarf();
    }, 1000);
  }

  moveDwarf() {
    let newCell;
    do {
      newCell = this.getRandomCell();
    } while (newCell === this.cellWithDwarf);

    this.cellWithDwarf.querySelector('.dwarf').remove();
    newCell.append(this.dwarf);
    this.dwarf.classList.remove('dwarf_hidden');
    this.cellWithDwarf = newCell;
  }

  getRandomCell() {
    const randomIndex = Math.floor(Math.random() * this.board.cells.length);
    return this.board.cells[randomIndex];
  }
}
