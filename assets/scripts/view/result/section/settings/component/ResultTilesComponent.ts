import { Component, Label, Node, _decorator } from 'cc'
const { ccclass, property } = _decorator


@ccclass('ResultTilesComponent')
export class ResultTilesComponent extends Component {
  @property(Label)
  readonly tilesLB: Label

  @property(Node)
  readonly options: Node
}
