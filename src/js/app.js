import BoardWithDwarf from './board';
import DwarfMoving from './dwarfMoving';

export default class Game {
  constructor() {
    this.board = new BoardWithDwarf('.game__container');
    this.gamePlay = new DwarfMoving(this.board);
  }

  init() {
    this.board.startDrawing();
    this.gamePlay.createDwarf();
  }
}
