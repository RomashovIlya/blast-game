import { _decorator } from 'cc'
import { Config } from '../../../service/config/Config'
import { ConfigLevelT } from '../../../service/config/entity/ConfigT'
const { ccclass } = _decorator


@ccclass('TurnModelData')
export abstract class TurnModelData {
  public static scoreTarget: number
  public static scoreCurrent: number

  public static turnLimit: number
  public static turnCurrent: number

  public static hasWin: boolean

  // RUNTIME
  public static _BURNED_TILES: number
  public static _LEVEL_TIME_END?: number

  public static _AWAIT_SCORE_UPDATE: boolean
  public static _AWAIT_TURN_UPDATE: boolean


  // INIT - BOARD
  public static init() {
    console.log('TurnModelData - INIT')

    const levelConfig = Config.getLinked('levels', 'test_level') as ConfigLevelT

    this.scoreTarget = levelConfig.score
    this.scoreCurrent = 0

    this.turnLimit = levelConfig.turns
    this.turnCurrent = 0

    this.hasWin = false

    this._BURNED_TILES = 0
  }

  
  // RESET - BOARD
  public static reset() {
    // RUNTIME
    this._BURNED_TILES = 0

    delete (this._LEVEL_TIME_END)

    delete (this._AWAIT_SCORE_UPDATE)
    delete (this._AWAIT_TURN_UPDATE)
  }
}