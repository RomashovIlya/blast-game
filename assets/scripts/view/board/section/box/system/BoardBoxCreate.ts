import { _decorator, Node, Vec3 } from 'cc'
import { BoxModelData } from '../../../../../model/box/data/BoxModelData'
import { BoxPipelineStartE } from '../../../../../model/box/entity/BoxModelE'
import { BoxTileT } from '../../../../../model/box/entity/BoxModelT'
import { Config } from '../../../../../service/config/Config'
import { ConfigTileBoosterE } from '../../../../../service/config/entity/ConfigE'
import { ConfigTileT } from '../../../../../service/config/entity/ConfigT'
import { ResourceImageE, ResourcePrefabE } from '../../../../../service/resource/entity/ResourceE'
import { Resource } from '../../../../../service/resource/Resource'
import { Colorize } from '../../../../../utils/colorize/Colorize'
import { Movement, MovementCallbackHandler } from '../../../../../utils/movement/Movement'
import { Randomize } from '../../../../../utils/randomize/Randomize'
import { BoardTileComponent } from '../component/BoardTileComponent'
import { BoardBoxState } from '../state/BoardBoxState'
const { ccclass } = _decorator

const TILE_PREFAB_NAME = 'BoardTile'
const CELL_PREFAB_NAME = 'BoardCell'

const DELAY_MIN = 30
const DELAY_MAX = 35
const DELAY_MOD = 100


@ccclass('BoardBoxCreate')
export abstract class BoardBoxCreate {
  // RUNTIME - BOARD
  public static createStartNodes() {
    if (BoxModelData._PIPELINE_START?.state !== BoxPipelineStartE.hasUpdatedLayout) return
    
    console.log('- BoardBoxField - createStartNodes')

    const list = BoxModelData.field.filter(i => i._DATA && !i._DATA.isCreated)

    if (list.length > 0) {
      for (const tile of list) {
        const node = this.createElement(tile)
        
        node.setParent(BoardBoxState.fieldComponent.node)
        node.position = Vec3.ZERO
      }

      BoardBoxState.fieldComponent.scheduleOnce(() => {
        for (const node of BoardBoxState.fieldComponent.node.children) {                   
          BoardBoxState.positions[+node.name] = node.position.clone()
        }

        BoardBoxState.fieldComponent.fieldLT.enabled = false

        for (const tile of BoxModelData.field) {
          const cell = this.createBackgroundCell(tile._GRID.id)
          cell.setParent(BoardBoxState.backgroundComponent.node)
          cell.position = BoardBoxState.positions[tile._GRID.id].clone()
        }
      })
    }

    BoxModelData._PIPELINE_START.state = BoxPipelineStartE.hasNewNodes
  }

  public static createNodes() {
    const list = BoxModelData.field?.filter(i => i._DATA && !i._DATA.isCreated)

    if (!list || list.length === 0) return

    console.log('- BoardBoxCreate - createNodes')

    for (const tile of list) {
      const node = this.createElement(tile)

      tile._FALL = {
        fromID: tile._GRID.id,
        isMoving: true
      }

      const callbackHandler = new CreateCallbackHandler(tile, node)
      const moveHandler = new Movement(callbackHandler)

      moveHandler.move({
        node,
        delay: Randomize.getIntInclusive(DELAY_MIN, DELAY_MAX) / DELAY_MOD,
        duration: 0,
        position: Vec3.ZERO
      })
    }
  }


  // PRIVATE
  private static createElement(tile: BoxTileT): Node {
    let node = Resource.elemInstant(ResourcePrefabE.board, TILE_PREFAB_NAME)
    node.name = tile._GRID.id + ''

    let component = node.getComponent(BoardTileComponent)

    if (tile._DATA?.basic) {
      const { color } = Config.getLinked('tiles', tile._DATA.basic.type) as ConfigTileT
      Colorize.setSpriteColor(component.contentSPR, color)
    }

    if (tile._DATA?.booster) {
      const { type, radius } = tile._DATA?.booster

      let image = 'booster_'

      switch (type) {
        case (ConfigTileBoosterE.line):
          image += type + '_' + radius
          break
        
        default:
          image += type
          break
      }

      component.contentSPR.spriteFrame = Resource.getFrame(ResourceImageE.icon_basic_path + image)
    }

    tile._DATA.isCreated = true

    return node
  }

  private static createBackgroundCell(index: number): Node {
    let node = Resource.elemInstant(ResourcePrefabE.board, CELL_PREFAB_NAME)
    node.name = index + ''

    return node
  }
}


// HANDLER
@ccclass('CreateCallbackHandler')
class CreateCallbackHandler extends MovementCallbackHandler {
  tile: BoxTileT
  node: Node

  constructor(tile: BoxTileT, node: Node) {
    super()

    this.tile = tile
    this.node = node
  }

  moveEnd() {
    this.node.setParent(BoardBoxState.fieldComponent.node)
    this.node.position = BoardBoxState.positions[this.tile._GRID.id]
    this.node.setSiblingIndex(-Infinity)

    const component = this.node.getComponent(BoardTileComponent)
    component.mainANIM.play('tile-appear')

    delete (this.tile._FALL)
  }
} 
