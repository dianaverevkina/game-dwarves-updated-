export default class BoardWithDwarf {
  constructor(container) {
    this.container = document.querySelector(container);
    this.boardEl = this.container.querySelector('.board');
    this.points = this.container.querySelector('.points');
    this.boardSize = 4;
    this.cells = [];

    this.calcPoints = this.calcPoints.bind(this);

    this.boardEl.addEventListener('click', this.calcPoints);
  }

  calcPoints(e) {
    const dwarf = e.target.closest('.dwarf');
    if (dwarf) {
      this.playerPoints.textContent++;
      dwarf.classList.add('dwarf_hidden');
    } else if (++this.dwarfPoints.textContent >= 5) {
      alert('Вы проиграли');
      this.playerPoints.textContent = 0;
      this.dwarfPoints.textContent = 0;
    }
  }

  startDrawing() {
    this.drawPoints();
    this.drawBoard();
  }

  drawPoints() {
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
    for (let i = 0; i < this.boardSize ** 2; i++) {
      const cellEl = document.createElement('div');
      cellEl.classList.add('board__cell', 'cell');
      this.boardEl.append(cellEl);
    }

    this.cells = Array.from(this.boardEl.children);
  }
}
