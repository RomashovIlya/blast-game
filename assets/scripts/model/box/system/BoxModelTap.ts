import { _decorator } from 'cc'
import { Config } from '../../../service/config/Config'
import { TurnModelData } from '../../turn/data/TurnModelData'
import { BoxModelData } from '../data/BoxModelData'
import { BoxPipelineTapE } from '../entity/BoxModelE'
const { ccclass } = _decorator


@ccclass('BoxModelTap')
export abstract class BoxModelTap {
  // RUNTIME - BOARD
  public static checkTap() {
    if (TurnModelData._LEVEL_TIME_END) return
    
    if (!BoxModelData._PIPELINE_TAP) return
    if (BoxModelData._PIPELINE_TAP.state !== BoxPipelineTapE.hasAnyTap) return
    
    if (!BoxModelData.clusters) {
      delete (BoxModelData._PIPELINE_TAP)

      return
    }

    const anyFalling = BoxModelData.field.find(i => i._FALL)

    if (anyFalling) {
      delete (BoxModelData._PIPELINE_TAP)

      return
    }

    console.log('- BoxModelTap - checkTap')

    const tile = BoxModelData.field.find(i => i._GRID.id === BoxModelData._PIPELINE_TAP.id)
    
    if (!tile) {
      console.warn(`BoxModelField - checkTap - field has no tile with id - ${BoxModelData._PIPELINE_TAP.id}`)  
      delete (BoxModelData._PIPELINE_TAP)

      return
    }

    // BOOSTER
    if (tile._DATA?.booster) {
      BoxModelData._PIPELINE_TAP.state = BoxPipelineTapE.hasBoosterTap

      return
    }
    
    // CLUSTER
    let cluster = BoxModelData.clusters.find(i => i.includes(tile._GRID.id))

    if (!cluster) {
      delete (BoxModelData._PIPELINE_TAP)

      return
    }

    BoxModelData.clusters = null

    const booster = Config.getBooster(cluster.length)

    if (booster) {
      const { type, radius } = booster
      
      tile._CREATE_DATA = {
        booster: {
          type,
          radius 
        }
      }
    }

    for (const index of cluster) {
      const tile = BoxModelData.field.find(i => i._GRID.id === index)

      tile._REMOVE = {}
    }

    TurnModelData._BURNED_TILES = cluster.length

    delete (BoxModelData._PIPELINE_TAP)
  }
}
