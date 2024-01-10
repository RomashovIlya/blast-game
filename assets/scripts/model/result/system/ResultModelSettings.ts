import { _decorator } from 'cc'
import { BoxModelData } from '../../box/data/BoxModelData'
import { ResultModelData } from '../data/ResultModelData'
import { ResultOptionE } from '../entity/ResultModelE'
const { ccclass } = _decorator


@ccclass('ResultModelSettings')
export abstract class ResultModelSettings {
  // RUNTIME - RESULT
  public static setCustom() {
    if (ResultModelData._CUSTOM_SETTINGS.length === 0) return

    console.log('- ResultModelSettings - setCustom')

    ResultModelData._OPTIONS_UPDATE = {}

    for (const item of ResultModelData._CUSTOM_SETTINGS) {
      switch (item.option) {
        case ResultOptionE.tiles:
          BoxModelData.tilesLimit = item.value
          ResultModelData._OPTIONS_UPDATE.isTiles = true
          break
        
        case ResultOptionE.columns:
          BoxModelData.columns = item.value
          ResultModelData._OPTIONS_UPDATE.isColumns = true
          break
        
        case ResultOptionE.rows:
          BoxModelData.rows = item.value
          ResultModelData._OPTIONS_UPDATE.isRows = true
          break
      }
    }

    BoxModelData.hasCustomSettings = true

    ResultModelData._CUSTOM_SETTINGS.length = 0
  }
}
