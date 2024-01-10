import { Component, Label, _decorator } from 'cc'
const { ccclass, property } = _decorator


@ccclass('BoardTurnComponent')
export class BoardTurnComponent extends Component {
  @property(Label)
  readonly turnLabel: Label
}
