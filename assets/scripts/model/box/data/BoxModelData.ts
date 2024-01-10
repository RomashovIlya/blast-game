import { _decorator } from 'cc'
import { Config } from '../../../service/config/Config'
import { ConfigTileBasicE } from '../../../service/config/entity/ConfigE'
import { ConfigLevelT } from '../../../service/config/entity/ConfigT'
import { BoxPipelineStartE, BoxPipelineTapE } from '../entity/BoxModelE'
import { BoxTileT } from '../entity/BoxModelT'
const { ccclass } = _decorator

const DEFAULT_CLUSTER_SIZE = 2

type PiplineStartT = {
  state: BoxPipelineStartE
}

type PiplineTapT = {
  state: BoxPipelineTapE
  id: number
}


@ccclass('BoxModelData')
export abstract class BoxModelData {
  public static clusterSize: number

  public static rows: number
  public static columns: number

  public static tilesLimit: number
  public static tiles: ConfigTileBasicE[]

  public static mixes: number

  public static field: BoxTileT[]

  public static isClustersCleared: boolean
  public static isClustersUpdated: boolean
  public static clusters: number[][] | null

  public static topRowIndex: number

  public static hasCustomSettings: boolean

  
  // RUNTIME 
  public static _PIPELINE_START?: PiplineStartT
  public static _PIPELINE_TAP?: PiplineTapT

  public static _AWAIT_FIELD_SHUFFLE?: boolean

  
  // INIT - BOARD
  public static init(activeLevel: string) {
    console.log('BoxModelData - INIT')

    this.clusterSize = DEFAULT_CLUSTER_SIZE

    const { grid, tiles, mixes } = Config.getLinked('levels', activeLevel) as ConfigLevelT
    const { columns, rows } = grid

    this.mixes = mixes
    
    this.rows = this.hasCustomSettings ? this.rows ?? rows : rows
    this.columns = this.hasCustomSettings ? this.columns ?? columns : columns
    this.tilesLimit = this.hasCustomSettings ?  this.tilesLimit ?? tiles : tiles

    this.tiles = Config.getBasicTiles()
    this.tiles.length = this.tilesLimit

    this.topRowIndex = this.rows - 1
  }


  // RESET - BOARD
  public static reset() {   
    // RUNTIME
    delete (this._PIPELINE_START)
    delete (this._PIPELINE_TAP)

    delete (this._AWAIT_FIELD_SHUFFLE)
  }
}
