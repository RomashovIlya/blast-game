import { _decorator } from 'cc'
import { ConfigSceneE } from '../../../service/config/entity/ConfigE'
const { ccclass } = _decorator


@ccclass('NavigationModelData')
export abstract class NavigationModelData {
  public static currentScene: ConfigSceneE = ConfigSceneE.boot

  // RUNTIME
  public static _SCENE_RUN?: ConfigSceneE
}
