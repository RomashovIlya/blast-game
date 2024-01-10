import { Component, _decorator } from 'cc'
import { PersistLoadData } from '../../boot/persist/load/data/PersistLoadData'
import { Result } from '../Result'
const { ccclass } = _decorator


@ccclass('ResultCanvasComponent')
export class ResultCanvasComponent extends Component {
  // ON LOAD
  protected async onLoad() {
    await Result.init(this.node)

    this.scheduleOnce(() => {  
      PersistLoadData._AWAIT_HIDE = true
    })
  }
  
  
  // ON DESTROY
  protected onDestroy() {
    Result.sceneReset()
  }
}
