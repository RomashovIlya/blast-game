import { _decorator, Component } from 'cc'
import { Boot } from '../../../Boot'
const { ccclass } = _decorator


@ccclass('ResetGameComponent')
export class ResetGameComponent extends Component {
  // EDITOR
  private onResetGame() {
    Boot.resetGame()
  }
}


