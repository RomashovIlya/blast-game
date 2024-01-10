import { _decorator } from 'cc'
const { ccclass } = _decorator


@ccclass('PersistLoadData')
export abstract class PersistLoadData {
  // RUNTIME
  public static _AWAIT_SHOW?: boolean
  public static _AWAIT_HIDE?: boolean
}


