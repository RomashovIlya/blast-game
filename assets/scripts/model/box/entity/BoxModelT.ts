import { ConfigTileBasicE, ConfigTileBoosterE } from '../../../service/config/entity/ConfigE'


type TileDataT = {
  basic?: BasicT
  booster?: BoosterT
}

type TileCreateT = {
  isCreated?: boolean
}

type TileBlastT = {
  isBlast?: boolean
}

type BasicT = {
  type: ConfigTileBasicE
}

type BoosterT = {
  type: ConfigTileBoosterE
  radius: number
}

type FallT = {
  fromID: number
  isMoving?: boolean
}

type ChangeCellT = {
  targetID: number 
  data: TileDataT
  isMoving?: boolean
}


export type TileGridT = {
  id: number
  row: number
  column: number
}

export type BoxTileT = {
  _GRID: TileGridT
  _DATA?: TileDataT & TileCreateT

  // RUNTIME
  _CREATE_DATA?: TileDataT
  _REMOVE?: TileDataT & TileBlastT
  _FALL?: FallT
  _CHANGE_CELL?: ChangeCellT
}
