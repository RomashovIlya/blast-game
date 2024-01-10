import { SpriteFrame, _decorator, resources } from 'cc'
import { ResourceData } from '../data/ResourceData'
const { ccclass } = _decorator


@ccclass('ResourceFrame')
export abstract class ResourceFrame {
  // INTERFACE
  public static async loadDir(path: string) {
    if (ResourceData.loadingFramePromises[path]) return

    return new Promise<SpriteFrame[]>((resolve, rejected) => {
      resources.loadDir(path, SpriteFrame, (err, assets) => {
        if (assets === null || assets.length === 0) {
          rejected('SpriteFrame ' + path + ' отсутсвует')
        }

        for (const item of assets) {
          const name = path + item.name

          ResourceData.resourceFrames[name] = item
        }

        ResourceData.loadingFramePromises[path] = path

        resolve(assets)
      })
    })
  }

  public static unloadRes(path: string) {
    if (ResourceData.loadingFramePromises[path] == null) {
      console.warn(`Resource SpriteFrame - path - ${path} - is missing`)
    }

    resources.release(path, SpriteFrame)

    for (const key in ResourceData.resourceFrames) {
      if (key.includes(path)) {
        ResourceData.resourceFrames[key] = null
        delete ResourceData.resourceFrames[key]

        console.warn('Resource SpriteFrame is unloading')
      }
    }

    ResourceData.loadingFramePromises[path] = null
  }
}
