import { _decorator, director } from 'cc'
import { PersistLoadData } from '../../../view/boot/persist/load/data/PersistLoadData'
import { NavigationModelData } from '../data/NavigationModelData'
const { ccclass } = _decorator


@ccclass('NavigationModel')
export abstract class NavigationModel {
  // RUNTIME - BOOT
  public static goTargetScene() {
    if (!NavigationModelData._SCENE_RUN) return

    console.log('- Navigation - goTargetScene - ', NavigationModelData._SCENE_RUN)

    if (NavigationModelData.currentScene !== NavigationModelData._SCENE_RUN) {
      PersistLoadData._AWAIT_SHOW = true

      NavigationModelData.currentScene = NavigationModelData._SCENE_RUN   
      director.loadScene(NavigationModelData.currentScene)
    }  

    delete (NavigationModelData._SCENE_RUN)
  }
}
