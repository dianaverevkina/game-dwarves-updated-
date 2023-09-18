import BoardWithDwarf from './board';
import DwarfMoving from './dwarfMoving';

export default class Game {
  constructor() {
    this.board = new BoardWithDwarf();
    this.gamePlay = new DwarfMoving(this.board);
  }

  init() {
    this.board.bindToContainer('.game__container');
    this.board.startDrawing();
    this.gamePlay.createDwarf();
  }
}
