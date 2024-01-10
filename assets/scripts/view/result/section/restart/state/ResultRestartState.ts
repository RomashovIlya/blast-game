import { _decorator, Node } from 'cc'
import { ResultRestartComponent } from '../component/ResultRestartComponent'
const { ccclass } = _decorator


@ccclass('ResultRestartState')
export abstract class ResultRestartState {
  public static restartComponent: ResultRestartComponent

  
  // INIT - RESULT
  public static init(canvas: Node) {   
    this.restartComponent = canvas.getComponentInChildren(ResultRestartComponent)
  }


  // RESET - RESULT
  public static reset() {
    this.restartComponent = null
  }
}
