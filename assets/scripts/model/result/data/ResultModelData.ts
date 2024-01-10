import { _decorator } from 'cc'
import { ResultOptionE } from '../entity/ResultModelE'
const { ccclass } = _decorator

const DEFAULT_TILES_OPTIONS = [ 2, 3, 4, 5, 6 ]
const DEFAULT_COLUMNS_OPTIONS = [ 3, 5, 7 ]
const DEFAULT_ROWS_OPTIONS = [ 3, 5, 7, 9 ]

type CustomSettingsT = {
  option: ResultOptionE
  value: number
}

type OptionsUpdateT = {
  isTiles?: boolean,
  isRows?: boolean,
  isColumns?: boolean,
} 


@ccclass('ResultModelData')
export abstract class ResultModelData {
  public static tilesOptions: number[]
  public static rowsOptions: number[]
  public static columnsOptions: number[]

  // RUNTIME
  public static _CUSTOM_SETTINGS: CustomSettingsT[]
  public static _OPTIONS_UPDATE?: OptionsUpdateT
  
  public static _AWAIT_OPTIONS_CREATE?: boolean
  public static _AWAIT_HEAD_LABEL_UPDATE?: boolean
  public static _AWAIT_RESTART_LABEL_UPDATE?: boolean

  
  // INIT - RESULT
  public static init() {
    console.log('ResultModelData - INIT')

    this.tilesOptions = DEFAULT_TILES_OPTIONS
    this.rowsOptions = DEFAULT_ROWS_OPTIONS
    this.columnsOptions = DEFAULT_COLUMNS_OPTIONS

    this._CUSTOM_SETTINGS = []
  }


  // RESET - BOARD
  public static reset() {   
    // RUNTIME
    this._CUSTOM_SETTINGS = []

    delete (this._AWAIT_OPTIONS_CREATE)
    delete (this._AWAIT_HEAD_LABEL_UPDATE)
    delete (this._AWAIT_RESTART_LABEL_UPDATE)
    delete (this._OPTIONS_UPDATE)
  }
}
