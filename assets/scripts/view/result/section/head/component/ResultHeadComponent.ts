import { Component, Label, _decorator } from 'cc'
const { ccclass, property } = _decorator


@ccclass('ResultHeadComponent')
export class ResultHeadComponent extends Component {
  @property(Label)
  readonly headLB: Label
}
