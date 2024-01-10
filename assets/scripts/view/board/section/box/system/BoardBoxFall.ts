import { _decorator } from 'cc'
import { BoxModelData } from '../../../../../model/box/data/BoxModelData'
import { BoxTileT } from '../../../../../model/box/entity/BoxModelT'
import { Movement, MovementCallbackHandler } from '../../../../../utils/movement/Movement'
import { BoardBoxState } from '../state/BoardBoxState'
const { ccclass } = _decorator

const DEFAULT_DURATION = 20
const DURATION_ROW_MOD = 2
const DURATION_MOD = 100



@ccclass('BoardBoxFall')
export abstract class BoardBoxFall {
  // RUNTIME - BOARD
  public static nodesFall() {
    const list = BoxModelData.field?.filter(i => i._FALL && !i._FALL.isMoving && i._DATA?.isCreated)

    if (!list || list.length === 0) return

    console.log('- BoardBoxFall - nodesFall')

    for (const tile of list) {
      let node = BoardBoxState.fieldComponent.node.getChildByName(tile._FALL.fromID + '')
      node.name = tile._GRID.id + ''

      tile._FALL.isMoving = true

      const callbackHandler = new FallCallbackHandler(tile)
      const moveHandler = new Movement(callbackHandler)

      const duration = (DEFAULT_DURATION + tile._GRID.row * DURATION_ROW_MOD) / DURATION_MOD

      moveHandler.move({
        node,
        delay: 0,
        duration: duration,
        position: BoardBoxState.positions[tile._GRID.id]
      })
    }
  }
}


// HANDLER
@ccclass('FallCallbackHandler')
class FallCallbackHandler extends MovementCallbackHandler {
  tile: BoxTileT

  constructor(tile: BoxTileT) {
    super()

    this.tile = tile
  }

  moveEnd() {
    delete (this.tile._FALL)
  }
} 