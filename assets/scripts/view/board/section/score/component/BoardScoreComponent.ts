import { Component, Label, _decorator } from 'cc'
const { ccclass, property } = _decorator


@ccclass('BoardScoreComponent')
export class BoardScoreComponent extends Component {
  @property(Label)
  readonly scoreLabel: Label
}
