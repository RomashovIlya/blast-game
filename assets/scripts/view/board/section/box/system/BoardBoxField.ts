  node: Node
import { _decorator, Node } from 'cc'
import { BoxModelData } from '../../../../../model/box/data/BoxModelData'
import { BoxPipelineStartE } from '../../../../../model/box/entity/BoxModelE'
import { BoxTileT } from '../../../../../model/box/entity/BoxModelT'
import { DeepCopy } from '../../../../../utils/deep-copy/DeepCopy'
import { Movement, MovementCallbackHandler } from '../../../../../utils/movement/Movement'
import { PersistLoadData } from '../../../../boot/persist/load/data/PersistLoadData'
import { BoardBoxState } from '../state/BoardBoxState'
const { ccclass } = _decorator

const SPACING = 8
const CELL_SIZE = 80

const DURATION = 0.3


@ccclass('BoardBoxField')
export abstract class BoardBoxField {
  // RUNTIME - BOARD
  public static showField() {
    if (BoxModelData._PIPELINE_START?.state !== BoxPipelineStartE.hasNewNodes) return

    console.log('- BoardBoxField - showField')

    BoardBoxState.fieldComponent.scheduleOnce(() => {
      PersistLoadData._AWAIT_HIDE = true
    })

    delete (BoxModelData._PIPELINE_START)
  }

  public static updateLayout() {
    if (BoxModelData._PIPELINE_START?.state !== BoxPipelineStartE.hasNewData) return
    
    console.log('- BoardBoxField - updateLayout')

    BoardBoxState.fieldComponent.fieldTR.width = BoxModelData.columns * CELL_SIZE + (BoxModelData.columns - 1) * SPACING
    BoardBoxState.fieldComponent.fieldTR.height = BoxModelData.rows * CELL_SIZE + (BoxModelData.rows - 1) * SPACING

    BoardBoxState.fieldComponent.fieldLT.spacingX = SPACING
    BoardBoxState.fieldComponent.fieldLT.spacingY = SPACING

    BoxModelData._PIPELINE_START.state = BoxPipelineStartE.hasUpdatedLayout
  }

  public static shuffleNodes() {
    const list = BoxModelData.field?.filter(i => i._CHANGE_CELL && !i._CHANGE_CELL.isMoving)

    if (!list || list.length === 0) return

    console.log('- BoardBoxField - shuffleNodes')

    for (const tile of list) {
      const { targetID } = tile._CHANGE_CELL

      tile._CHANGE_CELL.isMoving = true

      let node = BoardBoxState.fieldComponent.node.getChildByName(targetID + '')

      const callbackHandler = new SuffleCallbackHandler(tile, node)
      const moveHandler = new Movement(callbackHandler)

      moveHandler.move({
        node,
        delay: 0,
        duration: DURATION,
        position: BoardBoxState.positions[tile._GRID.id]
      })
    }
  }
}


// HANDLER
@ccclass('SuffleCallbackHandler')
class SuffleCallbackHandler extends MovementCallbackHandler {
  tile: BoxTileT
  node: Node

  constructor(tile: BoxTileT, node: Node) {
    super()

    this.tile = tile
    this.node = node
  }

  moveEnd() {
    this.node.name = this.tile._GRID.id + ''

    this.tile._DATA = DeepCopy.clone(this.tile._CHANGE_CELL.data)
    delete (this.tile._CHANGE_CELL)
  }
}