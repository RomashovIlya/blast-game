import { _decorator } from 'cc'
import { DeepCopy } from '../../../utils/deep-copy/DeepCopy'
import { BoxModelData } from '../data/BoxModelData'
const { ccclass } = _decorator


@ccclass('BoxModelRemove')
export abstract class BoxModelRemove {
  // RUNTIME - BOARD
  public static removeTiles() {
    const list = BoxModelData.field?.filter(i => i._DATA && i._REMOVE)

    if (!list || list.length === 0) return

    console.log('- BoxModelRemove - removeTiles')

    for (const tile of list) {
      for (const key in tile._DATA) {
        tile._REMOVE[key] = DeepCopy.clone(tile._DATA[key])
      }
      
      delete (tile._DATA)
    }
  }
}
