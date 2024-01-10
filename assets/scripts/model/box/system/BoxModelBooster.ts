import { _decorator } from 'cc'
import { ConfigTileBoosterE } from '../../../service/config/entity/ConfigE'
import { Matrix } from '../../../utils/matrix/Matrix'
import { BoxModelData } from '../data/BoxModelData'
import { BoxPipelineTapE } from '../entity/BoxModelE'
import { BoxTileT, TileGridT } from '../entity/BoxModelT'
const { ccclass } = _decorator


@ccclass('BoxModelBooster')
export abstract class BoxModelBooster {
  // RUNTIME - BOARD
  public static boosterAction() {
    if (!BoxModelData._PIPELINE_TAP) return
    if (BoxModelData._PIPELINE_TAP.state !== BoxPipelineTapE.hasBoosterTap) return

    console.log('- BoxModelBooster - boosterAction')

    const tile = BoxModelData.field.find(i => i._GRID.id === BoxModelData._PIPELINE_TAP.id)
    
    if (!tile) {
      console.warn(`BoxModelBooster - boosterAction - field has no tile with id - ${BoxModelData._PIPELINE_TAP.id}`)
      delete (BoxModelData._PIPELINE_TAP)

      return
    }

    const { type, radius } = tile._DATA.booster

    switch (type) {
      case ConfigTileBoosterE.field:
        this.blastField()
        break
      
      case ConfigTileBoosterE.bomb:
        this.blastBomb(tile._GRID, radius)
        break
      
      case ConfigTileBoosterE.line:
        this.blastLine(tile._GRID, radius)
        break
    }

    delete (BoxModelData._PIPELINE_TAP)
  }


  // PRIVATE
  private static blastField() {
    for (const tile of BoxModelData.field) {
      tile._REMOVE = {
        isBlast: true
      }
    }
  }

  private static blastLine(tileGrid: TileGridT, radius: number) {
    let list = []

    if (radius === 0) {
      list = BoxModelData.field.filter(i => i._GRID.row === tileGrid.row)
    }

    if (radius === 1) {
      list = BoxModelData.field.filter(i => i._GRID.column === tileGrid.column)
    }

    for (const tile of list) {
      tile._REMOVE = {
        isBlast: true
      }
    }
  }

  private static blastBomb(tileGrid: TileGridT, radius: number) {  
    const matrix = Matrix.getRadial({
      centerColumn: tileGrid.column,
      centerRow: tileGrid.row,
      rowsTotal: BoxModelData.rows,
      columnsTotal: BoxModelData.columns,
      radius
    })

    let list = [] as BoxTileT[]

    for (const item of matrix) {
      const tile = BoxModelData.field.find(i => i._GRID.column === item.column && i._GRID.row === item.row)

      if (tile) {
        list.push(tile)
      }
    }

    for (const tile of list) {
      tile._REMOVE = {
        isBlast: true
      }
    }
  }
}
