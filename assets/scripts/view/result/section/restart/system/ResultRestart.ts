import { _decorator } from 'cc'
import { ResultModelData } from '../../../../../model/result/data/ResultModelData'
import { Localization } from '../../../../../service/localization/Localization'
import { ResultRestartState } from '../state/ResultRestartState'
const { ccclass } = _decorator


@ccclass('ResultRestart')
export abstract class ResultRestart { 
  // RUNTIME - RESULT
  public static updateLabel() {
    if (!ResultModelData._AWAIT_RESTART_LABEL_UPDATE) return

    console.log('- ResultRestart - updateLabel')

    ResultRestartState.restartComponent.restartLB.string = Localization.getText('common', 'result_restart')

    delete (ResultModelData._AWAIT_RESTART_LABEL_UPDATE)
  }
}
