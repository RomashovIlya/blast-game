import { AudioClip, _decorator, resources } from 'cc'
import { ResourceData } from '../data/ResourceData'
const { ccclass } = _decorator


@ccclass('ResourceAudio')
export abstract class ResourceAudio {
  // INTERFACE
  public static async loadDir(path: string) {
    if (ResourceData.loadingAudioClipPromises[path]) return

    return new Promise<AudioClip[]>((resolve, rejected) => {
      resources.loadDir(path, AudioClip, (err, assets) => {
        if (assets === null || assets.length === 0) {
          rejected('AudioClip  ' + path + ' отсутсвует')
        }

        for (const item of assets) {
          const name = path + item.name
          ResourceData.resourceAudioClips[name] = item
        }

        ResourceData.loadingAudioClipPromises[path] = path

        resolve(assets)
      })
    })
  }

  public static unloadRes(path: string) {
    if (ResourceData.loadingAudioClipPromises[path] == null) {
      console.warn(`Resource AudioClip - path - ${path} - is missing`)
    }

    resources.release(path, AudioClip)

    for (const key in ResourceData.resourceAudioClips) {
      if (key.includes(path)) {
        ResourceData.resourceAudioClips[key] = null
        delete ResourceData.resourceAudioClips[key]

        console.warn('Resource AudioClip is unloading')
      }
    }

    ResourceData.loadingAudioClipPromises[path] = null
  }
}
