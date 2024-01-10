import { Component, _decorator } from 'cc'
import { Board } from '../Board'
const { ccclass } = _decorator


@ccclass('BoardCanvasComponent')
export class BoardCanvasComponent extends Component {
  // ON LOAD
  protected async onLoad() {
    await Board.init(this.node)
  }
  
  
  // ON DESTROY
  protected onDestroy() {
    Board.sceneReset()
  }
}
