import BoardWithDwarf from './board';
import GamePlay from './gamePlay';

export default class Game {
  constructor() {
    this.board = new BoardWithDwarf('.game__container');
    this.gamePlay = new GamePlay(this.board);
  }

  init() {
    this.board.startDrawing();
    this.gamePlay.createDwarf();
  }
}
