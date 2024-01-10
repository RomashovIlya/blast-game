import { _decorator } from 'cc'
import { TurnModelData } from '../../../../../model/turn/data/TurnModelData'
import { Localization } from '../../../../../service/localization/Localization'
import { BoardScoreState } from '../state/BoardScoreState'
const { ccclass } = _decorator


@ccclass('BoardScore')
export abstract class BoardScore { 
  // RUNTIME - BOARD
  public static updateView() {
    if (!TurnModelData._AWAIT_SCORE_UPDATE) return

    console.log('- BoardScore - updateView')

    BoardScoreState.scoreComponent.scoreLabel.string = Localization.getText('common', 'board_score') + TurnModelData.scoreCurrent + '/' + TurnModelData.scoreTarget

    delete (TurnModelData._AWAIT_SCORE_UPDATE)
  }
}
