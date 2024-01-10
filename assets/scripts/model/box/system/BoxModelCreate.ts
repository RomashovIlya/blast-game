import { _decorator } from 'cc'
import { ConfigTileBoosterE } from '../../../service/config/entity/ConfigE'
import { DeepCopy } from '../../../utils/deep-copy/DeepCopy'
import { Randomize } from '../../../utils/randomize/Randomize'
import { BoxModelData } from '../data/BoxModelData'
import { BoxPipelineStartE } from '../entity/BoxModelE'
import { BoxTileT } from '../entity/BoxModelT'
const { ccclass } = _decorator


@ccclass('BoxModelCreate')
export abstract class BoxModelCreate {
  // RUNTIME - BOARD
  public static createStartTiles() {
    if (BoxModelData._PIPELINE_START?.state !== BoxPipelineStartE.hasCreateTask) return

    const creatList = BoxModelData.field.filter(i => i._CREATE_DATA)

    if (creatList.length === 0) return

    console.log('- BoxModelCreate - createStartTiles')

    this.createElements(creatList)

    BoxModelData._PIPELINE_START.state = BoxPipelineStartE.hasNewData
  }

  public static createTiles() {
    if(BoxModelData._PIPELINE_START) return
    
    const list = BoxModelData.field?.filter(i => i._CREATE_DATA && !i._REMOVE)

    if (!list || list.length === 0) return

    console.log('- BoxModelCreate - createTiles')

    this.createElements(list)
  }

  
  // PRIVATE
  private static createElements(list: BoxTileT[]) {   
    for (let i = 0; i < list.length; i++) {
      let tile = list[i]

      tile._DATA = {}

      if (tile._CREATE_DATA?.basic) {
        tile._DATA.basic = DeepCopy.clone(tile._CREATE_DATA.basic)
      }

      if (tile._CREATE_DATA?.booster) {
        tile._DATA.booster = DeepCopy.clone(tile._CREATE_DATA.booster)

        let data = tile._DATA.booster

        if (data.type === ConfigTileBoosterE.line) {
          data.radius = Randomize.getIntInclusive(0, 1)
        }
      }

      delete (tile._CREATE_DATA)
    }
  }
}
