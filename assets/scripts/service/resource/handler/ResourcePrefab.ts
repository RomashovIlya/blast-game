import { Prefab, _decorator, resources } from 'cc'
import { ResourceData } from '../data/ResourceData'
const { ccclass } = _decorator


@ccclass('ResourcePrefab')
export abstract class ResourcePrefab {
  // INTERFACE
  public static async loadDir(path: string) {
    if (ResourceData.loadingPrefabPromises[path]) return

    return new Promise<Prefab[]>((resolve, rejected) => {
      resources.loadDir(path, Prefab, (err, assets) => {
        if (assets === null || assets.length === 0) {
          rejected('PREFABS ' + path + ' not found')
          console.warn('PREFABS ' + path + ' not found')
        }

        for (const item of assets) {
          let assetName = item.data.name
          const name = path + assetName

          ResourceData.resourcePrefabs[name] = item
        }

        ResourceData.loadingPrefabPromises[path] = path

        resolve(assets)
      })
    })
  }

  public static unloadRes(path: string) {
    if (ResourceData.loadingPrefabPromises[path] === null) {
      console.warn(`Resource Prefab - path - ${path} - is missing`)
    }

    resources.release(path, Prefab)

    for (const key in ResourceData.resourcePrefabs) {
      if (key.includes(path)) {
        ResourceData.resourcePrefabs[key] = null
        delete ResourceData.resourcePrefabs[key]

        console.warn('Resource PREFAB is unloading')
      }
    }

    ResourceData.loadingPrefabPromises[path] = null
  }
}
