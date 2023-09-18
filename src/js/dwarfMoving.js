export default class DwarfMoving {
  constructor(board) {
    this.board = board;
    this.dwarf = null;

    this.calcPoints = this.calcPoints.bind(this);
  }

  createDwarf() {
    this.dwarf = document.createElement('div');
    this.dwarf.classList.add('board__char', 'dwarf');
    this.dwarf.innerHTML = '<img src="./images/goblin.png" alt="dwarf" class="dwarf__img">';

    const firstCell = this.getRandomCell();
    this.cellWithDwarf = firstCell;
    this.cellWithDwarf.append(this.dwarf);
    this.dwarf.addEventListener('click', this.calcPoints);
    this.startMovingDwarf();
  }

  calcPoints(e) {
    const dwarf = e.target.closest('.dwarf');
    if (dwarf) {
      this.board.playerPoints.textContent++;
      dwarf.remove();
      clearInterval(this.moveDwarfInterval);
      this.createDwarf();
    }
  }

  startMovingDwarf() {
    if (this.moveDwarfInterval) {
      clearInterval(this.moveDwarfInterval);
    }

    this.moveDwarfInterval = setInterval(() => {
      if (this.dwarf) {
        if (++this.board.dwarfPoints.textContent >= 5) {
          clearInterval(this.moveDwarfInterval);
          this.board.showPopup('Вы проиграли.');
        }
        this.moveDwarf();
      }
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
