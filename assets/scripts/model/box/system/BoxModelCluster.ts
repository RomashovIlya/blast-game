import { _decorator } from 'cc'
import { BoxModelData } from '../data/BoxModelData'
import { BoxTileT } from '../entity/BoxModelT'
import { BoxStorage } from '../handler/BoxStorage'
const { ccclass } = _decorator


@ccclass('BoxModelCluster')
export abstract class BoxModelCluster {
  // RUNTIME - BOARD
  public static updateClusters() {
    if (BoxModelData._AWAIT_FIELD_SHUFFLE) return

    const anyNotReadyTile = BoxModelData.field.find(i => !i._DATA?.isCreated || i._FALL || i._CHANGE_CELL)

    if (anyNotReadyTile) {
      if (!BoxModelData.isClustersCleared) {

        BoxModelData.isClustersCleared = true
        BoxModelData.isClustersUpdated = false
        BoxModelData.clusters = null
        
        console.log('- BoxModelCluster - clusters cleared')
      }

      return
    }

    if (BoxModelData.isClustersUpdated) return

    const list = BoxModelData.field.filter(i => i._DATA?.basic)

    let clusterList = [] as number[][]
    let checked = [] as number[]

    for (const tile of list) {
      const cluster = this.fillCluster(tile, list, [], checked)

      if (cluster) {
        clusterList.push(cluster)
      }
    }

    if (clusterList.length === 0) {
      BoxModelData._AWAIT_FIELD_SHUFFLE = true
      console.log('- BoxModelCluster - shuffle field')

      return
    }

    BoxModelData.clusters = clusterList

    BoxModelData.isClustersUpdated = true
    BoxModelData.isClustersCleared = false

    console.log('- BoxModelCluster - clusters updated')

    BoxStorage.saveField()
  }

  
  // PRIVATE
  private static fillCluster(target: BoxTileT, tiles: BoxTileT[], cluster: number[], checked: number[]): number[] | null {
    if (checked.includes(target._GRID.id)) return null
            
    checked.push(target._GRID.id)
    cluster.push(target._GRID.id)

    const list = tiles.filter(i => i._DATA.basic)

    for (const disp of [-1, 1]) {
      const bound = list.find(i => i._GRID.column === target._GRID.column && i._GRID.row === target._GRID.row + disp && i._DATA.basic.type === target._DATA.basic.type)
      
      if (bound) {
        this.fillCluster(bound, tiles, cluster, checked)
      }
    }

    for (const disp of [-1, 1]) {
      const bound = list.find(i => i._GRID.row === target._GRID.row && i._GRID.column === target._GRID.column + disp && i._DATA.basic.type === target._DATA.basic.type)
      
      if (bound) {
        this.fillCluster(bound, tiles, cluster, checked)
      }
    }

    return cluster?.length >= BoxModelData.clusterSize ? cluster : null
  }
}
