import { SpriteAtlas, SpriteFrame, _decorator, resources } from 'cc'
import { ResourceData } from '../data/ResourceData'
const { ccclass } = _decorator


@ccclass('ResourceAtlass')
export abstract class ResourceAtlass {
  // INTERFACE
  public static async loadDir(path: string) {
    if (ResourceData.loadingFramePromises[path]) return

    let spriteFrameList: SpriteFrame[] = []

    return new Promise<SpriteFrame[]>((resolve, rejected) => {
      resources.loadDir(path, SpriteAtlas, (err, assets) => {
        if (assets === null || assets.length === 0) {
          rejected('SpriteFrame ' + path + ' отсутсвует')
        }

        for (const item of assets) {
          spriteFrameList.push(...item.getSpriteFrames())
        }

        for (const item of spriteFrameList) {
          const name = path + item.name
          ResourceData.resourceFrames[name] = item
        }

        ResourceData.loadingFramePromises[path] = path

        resolve(spriteFrameList)
      })
    })
  }
}
