import { _decorator, Node } from 'cc'
import { ResultFieldComponent } from '../component/ResultFieldComponent'
import { ResultTilesComponent } from '../component/ResultTilesComponent'
const { ccclass } = _decorator


@ccclass('ResultSettingsState')
export abstract class ResultSettingsState {
  public static tilesComponent: ResultTilesComponent
  public static fieldComponent: ResultFieldComponent

  
  // INIT - RESULT
  public static init(canvas: Node) {   
    this.tilesComponent = canvas.getComponentInChildren(ResultTilesComponent)
    this.fieldComponent = canvas.getComponentInChildren(ResultFieldComponent)
  }


  // RESET - RESULT
  public static reset() {
    this.tilesComponent = null
    this.fieldComponent = null
  }
}
