import { _decorator } from 'cc'
import { Config } from '../../../service/config/Config'
import { ConfigSceneE } from '../../../service/config/entity/ConfigE'
import { GlobalTime } from '../../../service/global-time/GlobalTime'
import { BoxModelData } from '../../box/data/BoxModelData'
import { NavigationModelData } from '../../navigation/data/NavigationModelData'
import { TurnModelData } from '../data/TurnModelData'
const { ccclass } = _decorator

const LEVEL_END_DELAY = 2


@ccclass('TurnModel')
export abstract class TurnModel {
  // RUNTIME - BOARD
  public static updateState() {
    if (TurnModelData._BURNED_TILES === 0) return

    console.log('- TurnModel - updateState')

    const scoreMod = Config.getScoreMode(TurnModelData._BURNED_TILES)

    TurnModelData.scoreCurrent += TurnModelData._BURNED_TILES * scoreMod
    TurnModelData.turnCurrent += 1

    TurnModelData._AWAIT_SCORE_UPDATE = true
    TurnModelData._AWAIT_TURN_UPDATE = true

    TurnModelData._BURNED_TILES = 0
  }

  public static checkResult() {
    if (TurnModelData._LEVEL_TIME_END) return

    if (TurnModelData.scoreCurrent >= TurnModelData.scoreTarget) {
      this.levelEnd(true)

      return
    }

    if (BoxModelData.mixes <= 0) {
      const anyBooster = BoxModelData.field.find(i => i._DATA?.booster)

      if (!anyBooster) {
        this.levelEnd(false)
      }

      return
    }

    if (TurnModelData.turnCurrent >= TurnModelData.turnLimit) {
      this.levelEnd(false)

      return
    }
  }

  public static levelTimeEnd() {
    if (!TurnModelData._LEVEL_TIME_END) return

    console.log('- TurnModel - levelTimeEnd')

    if (GlobalTime.sessionSeconds >= TurnModelData._LEVEL_TIME_END) {
      NavigationModelData._SCENE_RUN = ConfigSceneE.result
      
      delete (TurnModelData._LEVEL_TIME_END)
      
      return
    }
  }


  // PRIVATE
  private static levelEnd(hasWin: boolean) {
    TurnModelData.hasWin = hasWin
    TurnModelData._LEVEL_TIME_END = GlobalTime.sessionSeconds + LEVEL_END_DELAY
  }
}