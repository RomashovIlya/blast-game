import { Component, _decorator, macro } from 'cc'
import { Boot } from '../Boot'
const { ccclass } = _decorator

macro.CLEANUP_IMAGE_CACHE = false
macro.ENABLE_MULTI_TOUCH = false


@ccclass('PersistCanvasComponent')
export class PersistCanvasComponent extends Component {
  // ON LOAD
  protected async onLoad() {
    await Boot.init(this.node)
  }
}