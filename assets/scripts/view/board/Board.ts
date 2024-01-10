import { _decorator, Node, Tween } from 'cc'
import { BoxModelData } from '../../model/box/data/BoxModelData'
import { BoxPipelineStartE } from '../../model/box/entity/BoxModelE'
import { BoxModelBooster } from '../../model/box/system/BoxModelBooster'
import { BoxModelCluster } from '../../model/box/system/BoxModelCluster'
import { BoxModelCreate } from '../../model/box/system/BoxModelCreate'
import { BoxModelField } from '../../model/box/system/BoxModelField'
import { BoxModelRemove } from '../../model/box/system/BoxModelRemove'
import { BoxModelTap } from '../../model/box/system/BoxModelTap'
import { TurnModelData } from '../../model/turn/data/TurnModelData'
import { TurnModel } from '../../model/turn/system/TurnModel'
import { BoardBoxState } from './section/box/state/BoardBoxState'
import { BoardBoxCreate } from './section/box/system/BoardBoxCreate'
import { BoardBoxFall } from './section/box/system/BoardBoxFall'
import { BoardBoxField } from './section/box/system/BoardBoxField'
import { BoardBoxRemove } from './section/box/system/BoardBoxRemove'
import { BoardScoreState } from './section/score/state/BoardScoreState'
import { BoardScore } from './section/score/system/BoardScore'
import { BoardTurnState } from './section/turn/state/BoardTurnState'
import { BoardTurn } from './section/turn/system/BoardTurn'
const { ccclass } = _decorator


@ccclass('Board')
export abstract class Board {
  private static _isActive: boolean = false
  

  // INIT - BOARD CANVAS COMPONENT - ON LOAD
  public static async init(canvas: Node) {
    console.log('BOARD - INIT')

    // MODEL
    BoxModelData.init('test_level')
    TurnModelData.init()

    // VIEW
    BoardBoxState.init(canvas)
    BoardTurnState.init(canvas)
    BoardScoreState.init(canvas)

    BoxModelData._PIPELINE_START = {
      state: BoxPipelineStartE.hasGridTask
    }

    TurnModelData._AWAIT_SCORE_UPDATE = true
    TurnModelData._AWAIT_TURN_UPDATE = true

    this._isActive = true
  }


  // RUNTIME - BOOT
  public static runtime() {
    if (!this._isActive) return

    // MODEL
    BoxModelField.createGrid()
    BoxModelCreate.createStartTiles()
    
    BoxModelTap.checkTap()
    BoxModelBooster.boosterAction()

    BoxModelRemove.removeTiles()
    BoxModelCreate.createTiles()
    BoxModelField.checkEmpty()
    BoxModelField.shuffleField()

    // BoxModelField.saveField()

    BoxModelCluster.updateClusters()

    TurnModel.updateState()
    TurnModel.checkResult()
    TurnModel.levelTimeEnd()

    // VIEW
    BoardBoxField.updateLayout()
    BoardBoxCreate.createStartNodes()
    BoardBoxField.showField()

    BoardBoxRemove.removeNodes()
    BoardBoxCreate.createNodes()
    BoardBoxFall.nodesFall()
    
    BoardBoxField.shuffleNodes()
    
    BoardTurn.updateView()
    BoardScore.updateView()
  }

  
  // RESET - BOARD CANVAS COMPONENT - ON DESTROY
  public static sceneReset() {
    this._isActive = false

    Tween.stopAll()

    // MODEL
    BoxModelData.reset()
    TurnModelData.reset()

    // VIEW
    BoardBoxState.reset()
    BoardTurnState.reset()
    BoardScoreState.reset()
  }
}
