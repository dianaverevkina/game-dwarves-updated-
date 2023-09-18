export default class BoardWithDwarf {
  constructor() {
    this.container = null;
    this.boardEl = null;
    this.points = null;
    this.boardSize = 4;
    this.cells = [];

    this.calcPoints = this.calcPoints.bind(this);
  }

  bindToContainer(container) {
    this.container = document.querySelector(container);
  }

  startDrawing() {
    this.drawPoints();
    this.drawBoard();
  }

  drawPoints() {
    this.points = this.container.querySelector('.points');

    this.points.innerHTML = `
      <div class="points__player">
        Игрок: <span class="points__player-number">0</span>
      </div>
      <div class="points__dwarf">
        Гном: <span class="points__dwarf-number">0</span>
      </div>
    `;

    this.playerPoints = this.points.querySelector('.points__player-number');
    this.dwarfPoints = this.points.querySelector('.points__dwarf-number');
  }

  drawBoard() {
    this.boardEl = this.container.querySelector('.board');
    this.boardEl.addEventListener('click', this.calcPoints);

    for (let i = 0; i < this.boardSize ** 2; i++) {
      const cellEl = document.createElement('div');
      cellEl.classList.add('board__cell', 'cell');
      this.boardEl.append(cellEl);
    }

    this.cells = Array.from(this.boardEl.children);
  }

  calcPoints(e) {
    const dwarf = e.target.closest('.dwarf');
    if (dwarf) {
      this.playerPoints.textContent++;
      dwarf.classList.add('dwarf_hidden');
    } else if (++this.dwarfPoints.textContent >= 5) {
      this.showPopup('Вы проиграли.');
    }
  }

  showPopup(text) {
    this.popUp = document.createElement('div');
    this.popUp.classList.add('popup');
    this.popUp.innerHTML = `
      <div class="popup__container">
        <div class='popup__close'>
          <img src='./images/cross.svg' class='popup__close-img'>
        </div>
        <p class='popup__text'>${text}</p>
      </div>
    `;
    this.container.append(this.popUp);

    this.popUpClose = this.popUp.querySelector('.popup__close');
    this.addEventForClose();
  }

  addEventForClose() {
    this.popUpClose.addEventListener('click', () => {
      this.popUp.remove();
      this.resetPoints();
    });
  }

  resetPoints() {
    this.playerPoints.textContent = 0;
    this.dwarfPoints.textContent = 0;
  }
}
