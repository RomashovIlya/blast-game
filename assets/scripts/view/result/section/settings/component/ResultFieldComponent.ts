import { Component, Label, Node, _decorator } from 'cc'
const { ccclass, property } = _decorator


@ccclass('ResultFieldComponent')
export class ResultFieldComponent extends Component {
  @property(Label)
  readonly fieldLB: Label

  @property(Node)
  readonly rows: Node

  @property(Node)
  readonly columns: Node
}
