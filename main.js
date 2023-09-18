/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/board.js
class BoardWithDwarf {
  constructor(container) {
    this.container = document.querySelector(container);
    this.boardEl = this.container.querySelector('.board');
    this.points = this.container.querySelector('.points');
    this.boardSize = 4;
    this.cells = [];
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
;// CONCATENATED MODULE: ./src/js/dwarfMoving.js
class DwarfMoving {
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
;// CONCATENATED MODULE: ./src/js/app.js


class Game {
  constructor() {
    this.board = new BoardWithDwarf('.game__container');
    this.gamePlay = new DwarfMoving(this.board);
  }
  init() {
    this.board.startDrawing();
    this.gamePlay.createDwarf();
  }
}
;// CONCATENATED MODULE: ./src/js/startGame.js

const game = new Game();
game.init();
;// CONCATENATED MODULE: ./src/index.js


/******/ })()
;
//# sourceMappingURL=main.js.map