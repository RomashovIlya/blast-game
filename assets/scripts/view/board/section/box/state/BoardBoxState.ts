import { _decorator, Node, Vec3 } from 'cc'
import { BoardBackgroundComponent } from '../component/BoardBackgroundComponent'
import { BoardFieldComponent } from '../component/BoardFieldComponent'
import { BoardSpecialComponent } from '../component/BoardSpecialComponent'
const { ccclass } = _decorator


@ccclass('BoardBoxState')
export abstract class BoardBoxState {  
  public static fieldComponent: BoardFieldComponent
  public static backgroundComponent: BoardBackgroundComponent
  public static specialComponent: BoardSpecialComponent

  public static positions: { [key: number]: Vec3 }
  
  
  // INIT - BOARD
  public static init(canvas: Node) {      
    this.fieldComponent = canvas.getComponentInChildren(BoardFieldComponent)
    this.backgroundComponent = canvas.getComponentInChildren(BoardBackgroundComponent)
    this.specialComponent = canvas.getComponentInChildren(BoardSpecialComponent)

    this.positions = {}
  }


  // RESET - BOARD
  public static reset() {
    this.fieldComponent = null
    this.specialComponent = null
    this.backgroundComponent = null

    this.positions = null
  }
}
