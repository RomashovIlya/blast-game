import { _decorator } from 'cc'
import { GameStorage } from '../../../service/game-storage/GameStorage'
import { BoxModelData } from '../data/BoxModelData'
import { BoxTileT } from '../entity/BoxModelT'
const { ccclass } = _decorator


@ccclass('BoxStorage')
export abstract class BoxStorage {
  // INTERFACE
  public static saveField() {
    console.log('- BoxStorage - saveField')

    const saveData = BoxModelData.field.map(i => {
      const { _GRID, _DATA } = i

      return {
        _GRID,
        _DATA
      }
    }) as BoxTileT[]

    GameStorage.setItem('box_field', saveData)    
    //+ SERVER API POST
  }
}
