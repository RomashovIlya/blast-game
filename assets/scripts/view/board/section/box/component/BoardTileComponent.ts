import { Animation, Component, Sprite, _decorator } from 'cc'
import { BoxModelData } from '../../../../../model/box/data/BoxModelData'
import { BoxPipelineTapE } from '../../../../../model/box/entity/BoxModelE'
const { ccclass, property } = _decorator


@ccclass('BoardTileComponent')
export class BoardTileComponent extends Component {
  @property(Animation)
  readonly mainANIM: Animation

  @property(Sprite)
  readonly contentSPR: Sprite

  
  // EDITOR
  private onElementTap() {
    if (BoxModelData._PIPELINE_TAP) return

    BoxModelData._PIPELINE_TAP = {
      state: BoxPipelineTapE.hasAnyTap,
      id: + this.node.name
    }
  }
}
