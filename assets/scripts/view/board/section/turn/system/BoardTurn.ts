import { _decorator } from 'cc'
import { TurnModelData } from '../../../../../model/turn/data/TurnModelData'
import { Localization } from '../../../../../service/localization/Localization'
import { BoardTurnState } from '../state/BoardTurnState'
const { ccclass } = _decorator


@ccclass('BoardTurn')
export abstract class BoardTurn { 
  // RUNTIME - BOARD
  public static updateView() {
    if (!TurnModelData._AWAIT_TURN_UPDATE) return

    console.log('- BoardTurn - updateView')

    BoardTurnState.turnComponent.turnLabel.string = Localization.getText('common', 'board_turn') + TurnModelData.turnCurrent + '/' + TurnModelData.turnLimit

    delete (TurnModelData._AWAIT_TURN_UPDATE)
  }
}
