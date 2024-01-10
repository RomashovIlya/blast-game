import { Button, Component, Label, _decorator } from 'cc'
import { NavigationModelData } from '../../../../../model/navigation/data/NavigationModelData'
import { ConfigSceneE } from '../../../../../service/config/entity/ConfigE'
const { ccclass, property } = _decorator


@ccclass('ResultRestartComponent')
export class ResultRestartComponent extends Component {
  @property(Label)
  readonly restartLB: Label

  @property(Button)
  readonly restartBTN: Button


  // EDITOR
  private onReset() {
    NavigationModelData._SCENE_RUN = ConfigSceneE.board
  }
}
