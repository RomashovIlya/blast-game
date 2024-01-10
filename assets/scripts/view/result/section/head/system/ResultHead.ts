import { _decorator } from 'cc'
import { ResultModelData } from '../../../../../model/result/data/ResultModelData'
import { TurnModelData } from '../../../../../model/turn/data/TurnModelData'
import { Localization } from '../../../../../service/localization/Localization'
import { ResultHeadState } from '../state/ResultHeadState'
const { ccclass } = _decorator


@ccclass('ResultHead')
export abstract class ResultHead { 
  // RUNTIME - RESULT
  public static updateLabel() {
    if (!ResultModelData._AWAIT_HEAD_LABEL_UPDATE) return

    console.log('- ResultHead - updateLabel')

    const textKey = TurnModelData.hasWin ? 'result_win' : 'result_lose'
    ResultHeadState.headComponent.headLB.string = Localization.getText('common', textKey)

    delete (ResultModelData._AWAIT_HEAD_LABEL_UPDATE)
  }
}
