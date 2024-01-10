import { _decorator, director, Node } from 'cc'
import { NavigationModelData } from '../../model/navigation/data/NavigationModelData'
import { NavigationModel } from '../../model/navigation/system/NavigationModel'
import { Auth } from '../../service/auth/Auth'
import { Config } from '../../service/config/Config'
import { ConfigSceneE } from '../../service/config/entity/ConfigE'
import { GameStorage } from '../../service/game-storage/GameStorage'
import { GlobalTime } from '../../service/global-time/GlobalTime'
import { Localization } from '../../service/localization/Localization'
import { Resource } from '../../service/resource/Resource'
import { Board } from '../board/Board'
import { Result } from '../result/Result'
import { PersistLoad } from './persist/load/system/PersistLoad'
import { RuntimeComponent } from './runtime/RuntimeComponent'
const { ccclass } = _decorator


@ccclass('Boot')
export abstract class Boot {
  private static _isInited: boolean

  private static _persistCanvas: Node
  private static _runtimeComponent: RuntimeComponent
  
  
  // INIT - BOOT CANVAS COMPONENT - ON LOAD
  public static async init(canvas: Node) {
    if (this._isInited) return

    console.log('BOOT - INIT')

    // SERVICE
    Auth.init()
    GlobalTime.init()
    GameStorage.init()
    Localization.init()
    Config.init()

    await Resource.init()

    // MODEL

    // PERSIST UI
    PersistLoad.init(canvas)

    // PERSIST ROOT
    this._persistCanvas = canvas
    
    canvas.setParent(null)
    director.addPersistRootNode(canvas)

    // START SCENE
    NavigationModelData._SCENE_RUN = ConfigSceneE.board
    
    // RUNTIME
    this._runtimeComponent = canvas.parent.getComponentInChildren(RuntimeComponent)
    this._runtimeComponent.init(this)
    this._runtimeComponent.node.active = true

    this._isInited = true
  }

  
  // RUNTIME
  public static runtime() {
    console.log('-- RUN')

    // NAVIGATION
    NavigationModel.goTargetScene()

    // MODEL

    // SCENES
    Board.runtime()
    Result.runtime()
    
    // PERSIST UI
    PersistLoad.show()
    PersistLoad.hide()
  }


  // RESET - RESET GAME COMPONENT - ON CLICK
  public static resetGame() {
    console.log('BOOT - RESET')

    this._isInited = false

    // RUNTIME
    this._runtimeComponent = null

    // SERVICE
    Auth.reset()
    GameStorage.reset()
    Localization.reset()
    Config.reset()
    GlobalTime.reset()

    // MODEL

    // PERSIST UI
    PersistLoad.reset()

    // DESTROY & REBUILD
    this._persistCanvas.destroy()
    this._persistCanvas = null

    NavigationModelData._SCENE_RUN = ConfigSceneE.boot   
    NavigationModel.goTargetScene()
  }
}
