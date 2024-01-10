import { _decorator } from 'cc'
import { DeepCopy } from '../../utils/deep-copy/DeepCopy'
import { ConfigData } from './data/ConfigData'
import { ConfigTileBasicE } from './entity/ConfigE'
import { ConfigBoosterT, ConfigLevelT, ConfigLinkedT, ConfigScoreT, ConfigTileT } from './entity/ConfigT'
import mainConfig from './json/config-main.json'
const { ccclass } = _decorator


@ccclass('Config')
export abstract class Config {
  // CONTROLS
  private static _basicTiles: ConfigTileBasicE[]
  private static _boosterRange: ConfigBoosterT[]
  private static _scoreRange: ConfigScoreT[]


  // INIT
  public static init() {
    ConfigData.linked = {
      levels: {},
      tiles: {},
    }

    this.setLevels()
    this.setTiles()

    this.setBooster()
    this.setScore()
  }

  
  // INTERFACE
  public static getLinked<T>(sheet: keyof ConfigLinkedT, slugID: string): Readonly<T | null> {
    if (!ConfigData.linked[sheet][slugID]) {
      console.warn(`Config - name - ${slugID} - in sheet - ${sheet} - is missing`)

      return null
    }

    return ConfigData.linked[sheet][slugID] as T
  }

  public static getBasicTiles(): ConfigTileBasicE[] {
    return DeepCopy.clone(this._basicTiles)
  }

  public static getBooster(clusterSize: number): ConfigBoosterT | null {
    for (let i = this._boosterRange.length - 1; i >= 0; i--) {
      const item = this._boosterRange[i]

      if (clusterSize >= item.size) return item
    }

    return null
  }

  public static getScoreMode(value: number): number {
    for (let i = this._scoreRange.length - 1; i >= 0; i--) {
      const item = this._scoreRange[i]

      if (value >= item.size) return item.mod
    }
  }

  
  // PRIVATE
  private static setLevels() {
    const { levels } = mainConfig

    ConfigData.linked.levels = {}
    
    for (const item of levels as ConfigLevelT[]) {
      ConfigData.linked.levels[item.slug_id] = item
    }
  }

  private static setTiles() {
    const { basic_tiles } = mainConfig

    ConfigData.linked.tiles = {}
    this._basicTiles = []
    
    for (const item of basic_tiles as ConfigTileT[]) {
      ConfigData.linked.tiles[item.slug_id] = item
      this._basicTiles.push(item.slug_id)
    }
  }

  private static setBooster() {
    const { booster_range } = mainConfig

    this._boosterRange = booster_range as ConfigBoosterT[]
    this._boosterRange.sort((a, b) => a.size - b.size)
  }

  private static setScore() {
    const { score_range } = mainConfig

    this._scoreRange = score_range as ConfigScoreT[]
    this._scoreRange.sort((a, b) => a.size - b.size)
  }


  // RESET - BOOT
  public static reset() {
    ConfigData.linked = null

    this._boosterRange = null
    this._scoreRange = null
  }
}