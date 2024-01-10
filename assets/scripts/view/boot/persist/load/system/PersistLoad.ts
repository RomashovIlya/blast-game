import { _decorator, Node } from 'cc'
import { PersistLoadComponent } from '../component/PersistLoadComponent'
import { PersistLoadData } from '../data/PersistLoadData'
const { ccclass } = _decorator


@ccclass('PersistLoad')
export abstract class PersistLoad {
  private static _loadComponent: PersistLoadComponent
  

  // INIT - BOOT
  public static init(canvas: Node) {
    this._loadComponent = canvas.getComponentInChildren(PersistLoadComponent)
  }

  
  // RUNTIME - BOOT
  public static show() {
    if (!PersistLoadData._AWAIT_SHOW) return

    console.log('- LoadScreen - show')

    this._loadComponent.node.active = true

    delete (PersistLoadData._AWAIT_SHOW)
  }

  public static hide() {
    if (!PersistLoadData._AWAIT_HIDE) return

    console.log('- LoadScreen - hide')

    this._loadComponent.node.active = false

    delete (PersistLoadData._AWAIT_HIDE)
  }


  // RESET - BOOT
  public static reset() {
    this._loadComponent = null

    delete (PersistLoadData._AWAIT_SHOW)
    delete (PersistLoadData._AWAIT_HIDE)
  }
}
