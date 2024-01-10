import { Component, Layout, UITransform, _decorator } from 'cc'
const { ccclass, property } = _decorator


@ccclass('BoardFieldComponent')
export class BoardFieldComponent extends Component {
  @property(UITransform)
  readonly fieldTR: UITransform

  @property(Layout)
  readonly fieldLT: Layout
}
