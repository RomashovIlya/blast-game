import { Component, Label, Node, _decorator } from 'cc'
import { ResultModelData } from '../../../../../model/result/data/ResultModelData'
import { ResultOptionE } from '../../../../../model/result/entity/ResultModelE'
const { ccclass, property } = _decorator


@ccclass('ResultOptionComponent')
export class ResultOptionComponent extends Component {
  @property(Node)
  readonly check: Node

  @property(Label)
  readonly optionLB: Label

  public type: ResultOptionE


  // EDITOR
  private onChoice() {
    console.log('ResultOptionComponent - onChoice', this.node.name, this.type)

    if (this.check.active) return

    ResultModelData._CUSTOM_SETTINGS.push({
      option: this.type,
      value: +this.node.name
    })
  }
}
