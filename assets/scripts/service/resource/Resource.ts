import { AudioClip, Node, Prefab, SpriteFrame, _decorator, instantiate } from 'cc'
import { ResourceData } from './data/ResourceData'
import { ResourceImageE, ResourcePrefabE, ResourceSoundE } from './entity/ResourceE'
import { ResourceAudio } from './handler/ResourceAudio'
import { ResourceFrame } from './handler/ResourceFrame'
import { ResourcePrefab } from './handler/ResourcePrefab'
const { ccclass } = _decorator


@ccclass('Resource')
export abstract class Resource {
  private static _isInited: boolean = false

  // INTERFACE
  public static async init() {
    if (this._isInited) return

    const start = performance.now()

    // IMAGES
    await ResourceFrame.loadDir(ResourceImageE.icon_basic_path)

    // PREFABS
    await ResourcePrefab.loadDir(ResourcePrefabE.board)
    await ResourcePrefab.loadDir(ResourcePrefabE.result)

    this._isInited = true

    console.log('Resurces loaded: ' + (performance.now() - start))
  }

  public static elemInstant(pathE: ResourcePrefabE, prefabName: string): Node {
    const prefab = ResourceData.resourcePrefabs[pathE + prefabName] as Prefab

    if (!prefab) throw new Error(`Prefab path - ${pathE} & ${prefabName} - is missing`)

    let node = instantiate(prefab)

    return node
  }

  public static getFrame(path: string): SpriteFrame {
    const result = ResourceData.resourceFrames[path]

    if (!result) {
      console.warn(`Frame on path - ${path} - is missing`)

      return null
    }

    return result
  }

  public static getAudioClipDir(path: string): AudioClip[] {
    const assets: AudioClip[] = []

    for (const key in ResourceData.resourceAudioClips) {
      if (key.indexOf(path) === 0) {
        assets.push(ResourceData.resourceAudioClips[key])
      }
    }

    return assets
  }

  public static unloadPrefabs(pathE: ResourcePrefabE) {
    ResourcePrefab.unloadRes(pathE)
  }

  public static unloadFrames(pathE: ResourceImageE) {
    ResourceFrame.unloadRes(pathE)
  }

  public static unloadAudioClips(pathE: ResourceSoundE) {
    ResourceAudio.unloadRes(pathE)
  }
}
