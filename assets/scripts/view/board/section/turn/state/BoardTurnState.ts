import { _decorator, Node } from 'cc'
import { BoardTurnComponent } from '../component/BoardTurnComponent'
const { ccclass } = _decorator


@ccclass('BoardTurnState')
export abstract class BoardTurnState {
  public static turnComponent: BoardTurnComponent

  
  // INIT - BOARD
  public static init(canvas: Node) {   
    this.turnComponent = canvas.getComponentInChildren(BoardTurnComponent)
  }


  // RESET - BOARD
  public static reset() {
    this.turnComponent = null
  }
}
