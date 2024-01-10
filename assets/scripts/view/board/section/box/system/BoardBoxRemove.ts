import { _decorator, Node } from 'cc'
import { BoxModelData } from '../../../../../model/box/data/BoxModelData'
import { BoxTileT } from '../../../../../model/box/entity/BoxModelT'
import { Config } from '../../../../../service/config/Config'
import { ConfigTileT } from '../../../../../service/config/entity/ConfigT'
import { ResourcePrefabE } from '../../../../../service/resource/entity/ResourceE'
import { Resource } from '../../../../../service/resource/Resource'
import { ColorE, Colorize } from '../../../../../utils/colorize/Colorize'
import { BoardBlastComponent } from '../component/BoardBlastComponent'
import { BoardBoxState } from '../state/BoardBoxState'
const { ccclass } = _decorator

const BLAST_PREFAB_NAME = 'BoardBlast'


@ccclass('BoardBoxRemove')
export abstract class BoardBoxRemove {
  // RUNTIME - BOARD
  public static removeNodes() {
    const list = BoxModelData.field?.filter(i => i._REMOVE && !i._DATA)

    if (list?.length === 0) return

    console.log('- BoardBoxRemove - removeNodes')

    for (const tile of list) {
      // NODE
      let node = BoardBoxState.fieldComponent.node.getChildByName(tile._GRID.id + '')
      node.name = 'remove'
      node.destroy()
      
      // PARTICLE
      let blast = this.createBlast(tile)
      
      blast.setParent(BoardBoxState.specialComponent.node)
      blast.position = BoardBoxState.positions[tile._GRID.id]
      blast.setSiblingIndex(Infinity)

      delete (tile._REMOVE)
    }
  }


  // PRIVATE
  private static createBlast(tile: BoxTileT): Node {
    const node = Resource.elemInstant(ResourcePrefabE.board, BLAST_PREFAB_NAME)
    const component = node.getComponent(BoardBlastComponent)

    let color = 'black' as ColorE

    if (tile._REMOVE?.basic && !tile._REMOVE.isBlast) {
      const tileConfig = Config.getLinked('tiles', tile._REMOVE.basic.type) as ConfigTileT
      color = tileConfig.color
    }

    Colorize.setParticleColor(component.mainPS, color)

    return node
  }
}
