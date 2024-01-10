import { ColorE } from '../../../utils/colorize/Colorize'
import { ConfigTileBasicE, ConfigTileBoosterE } from './ConfigE'


// ------------------------------
// LINKED
// ------------------------------
export type ConfigLinkedT = {
  levels: { [key: string]: ConfigLevelT }
  tiles: { [key: string]: ConfigTileT }
}


// ------------------------------
// LEVEL
//-------------------------------
export type ConfigLevelT = {
  // id: number --> SERVER
  slug_id: string
  turns: number
  score: number
  grid: ConfigLevelGridT
  tiles: number
  mixes: number
}

type ConfigLevelGridT = {
  columns: number
  rows: number
}


// ------------------------------
// TILE
//-------------------------------
export type ConfigTileT = {
  slug_id: ConfigTileBasicE
  color: ColorE
}


// ------------------------------
// SCORE
//-------------------------------
export type ConfigScoreT = {
  size: number
  mod: number
}


// ------------------------------
// BOOSTER
//-------------------------------
export type ConfigBoosterT = {
  size: number
  type: ConfigTileBoosterE
  radius: number
}


// ------------------------------
// RANGE
//-------------------------------
export type ConfigRangeT = {
  min: number
  max: number
}
