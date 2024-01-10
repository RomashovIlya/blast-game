import { _decorator, Node } from 'cc'
import { ResultModelData } from '../../model/result/data/ResultModelData'
import { ResultModelSettings } from '../../model/result/system/ResultModelSettings'
import { ResultHeadState } from './section/head/state/ResultHeadState'
import { ResultHead } from './section/head/system/ResultHead'
import { ResultRestartState } from './section/restart/state/ResultRestartState'
import { ResultRestart } from './section/restart/system/ResultRestart'
import { ResultSettingsState } from './section/settings/state/ResultSettingsState'
import { ResultSettings } from './section/settings/system/ResultSettings'
const { ccclass } = _decorator


@ccclass('Result')
export abstract class Result {
  private static _isActive: boolean = false
  

  // INIT - RESULT CANVAS COMPONENT - ON LOAD
  public static async init(canvas: Node) {
    console.log('RESULT - INIT')

    // MODEL
    ResultModelData.init()

    // VIEW
    ResultHeadState.init(canvas)
    ResultRestartState.init(canvas)
    ResultSettingsState.init(canvas)
    
    ResultModelData._AWAIT_HEAD_LABEL_UPDATE = true
    ResultModelData._AWAIT_RESTART_LABEL_UPDATE = true
    ResultModelData._AWAIT_OPTIONS_CREATE = true

    this._isActive = true
  }


  // RUNTIME - BOOT
  public static runtime() {
    if (!this._isActive) return

    // MODEL
    ResultModelSettings.setCustom()

    // VIEW
    ResultHead.updateLabel()
    ResultRestart.updateLabel()
    ResultSettings.createView()
    ResultSettings.updateView()
  }

  
  // RESET - RESULT CANVAS COMPONENT - ON DESTROY
  public static sceneReset() {
    this._isActive = false

    // MODEL
    ResultModelData.reset()

    // VIEW
    ResultHeadState.reset()
    ResultRestartState.reset()
    ResultSettingsState.reset()
  }
}
