import { _decorator } from 'cc'
import { DeepCopy } from '../../../utils/deep-copy/DeepCopy'
import { Randomize } from '../../../utils/randomize/Randomize'
import { Shuffle } from '../../../utils/shuffle/Shuffle'
import { BoxModelData } from '../data/BoxModelData'
import { BoxPipelineStartE } from '../entity/BoxModelE'
import { BoxTileT } from '../entity/BoxModelT'
const { ccclass } = _decorator


@ccclass('BoxModelField')
export abstract class BoxModelField {
  // RUNTIME - BOARD
  public static createGrid() {
    if (BoxModelData._PIPELINE_START?.state !== BoxPipelineStartE.hasGridTask) return

    console.log('- BoxModelField - createGrid')

    BoxModelData.field = []

    let index = 0

    const tileTypes = Randomize.getLimitedList(BoxModelData.tiles, BoxModelData.rows * BoxModelData.columns)

    for (let row = 0; row < BoxModelData.rows; row++) {
      for (let column = 0; column < BoxModelData.columns; column++) {
        BoxModelData.field.push({
          _GRID: {
            id: index,
            row: row,
            column: column,
          },

          _CREATE_DATA: {
            basic: {
              type: tileTypes[index]
            }
          }
        })

        index++
      }
    }

    BoxModelData._PIPELINE_START.state = BoxPipelineStartE.hasCreateTask
  }

  public static checkEmpty() {
    if (BoxModelData._PIPELINE_START) return

    const anyEmptyTile = BoxModelData.field?.find(i => !i._DATA?.isCreated)

    if (!anyEmptyTile) return

    console.log('- BoxModelField - checkEmpty')

    for (let column = 0; column < BoxModelData.columns; column++) {
      let rowList = BoxModelData.field.filter(i => i._GRID.column === column)

      const oldData = rowList.find(i => i._REMOVE || i._CREATE_DATA)

      if (oldData) continue
      
      rowList.sort((a, b) => a._GRID.row - b._GRID.row)

      let lowerEmpty = null as BoxTileT

      for (let i = 0; i < rowList.length; i++) {
        const tile = rowList[i]

        if (!lowerEmpty && !tile._DATA) {
          lowerEmpty = tile

          continue
        }

        if (lowerEmpty && tile._DATA?.isCreated && !tile._FALL) {
          const underTile = rowList[i - 1]

          if (underTile._DATA) continue
            underTile._FALL = {
              fromID: +tile._GRID.id
            }

            underTile._DATA = DeepCopy.clone(tile._DATA)
            underTile._DATA.isCreated
          
          delete (tile._DATA)
        }
      }

      if (lowerEmpty) {
        let topTile = rowList[BoxModelData.topRowIndex]

        if (!topTile._DATA) {
          const [ type ] = Randomize.getLimitedList(BoxModelData.tiles, 1)

          topTile._CREATE_DATA = {
            basic: {
              type,
            }
          }
        }
      }
    }
  }
    
  public static shuffleField() {
    if (!BoxModelData._AWAIT_FIELD_SHUFFLE) return

    console.log('- BoxModelField - shuffleField')

    if (BoxModelData.mixes <= 0) {
      delete (BoxModelData._AWAIT_FIELD_SHUFFLE)

      return
    }

    BoxModelData.mixes -= 1

    let cellsList = BoxModelData.field.map(i => {
      const { id } = i._GRID
      return id
    })

    Shuffle.list(cellsList)

    for (let i = 0; i < BoxModelData.field.length; i++) {
      let tile = BoxModelData.field[i]

      const targetID = cellsList[i]
      const targetTile = BoxModelData.field.find(i => i._GRID.id === targetID)

      tile._CHANGE_CELL = {
        targetID,
        data: DeepCopy.clone(targetTile._DATA)
      }
    }

    delete (BoxModelData._AWAIT_FIELD_SHUFFLE)
  }
}
