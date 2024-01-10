import { _decorator, Node } from 'cc'
import { BoardScoreComponent } from '../component/BoardScoreComponent'
const { ccclass } = _decorator


@ccclass('BoardScoreState')
export abstract class BoardScoreState {
  public static scoreComponent: BoardScoreComponent

  
  // INIT - BOARD
  public static init(canvas: Node) {   
    this.scoreComponent = canvas.getComponentInChildren(BoardScoreComponent)
  }


  // RESET - BOARD
  public static reset() {
    this.scoreComponent = null
  }
}
