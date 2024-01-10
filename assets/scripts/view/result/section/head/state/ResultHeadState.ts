import { _decorator, Node } from 'cc'
import { ResultHeadComponent } from '../component/ResultHeadComponent'
const { ccclass } = _decorator


@ccclass('ResultHeadState')
export abstract class ResultHeadState {
  public static headComponent: ResultHeadComponent
  
  
  // INIT - RESULT
  public static init(canvas: Node) {   
    this.headComponent = canvas.getComponentInChildren(ResultHeadComponent)
  }


  // RESET - RESULT
  public static reset() {
    this.headComponent = null
  }
}
