import { _decorator } from 'cc'
const { ccclass } = _decorator


@ccclass('ResourceData')
export abstract class ResourceData {
  public static resourcePrefabs = {}
  public static resourceFrames = {}
  public static resourceAudioClips = {}

  public static loadingPrefabPromises = []
  public static loadingFramePromises = []
  public static loadingAudioClipPromises = []
}
