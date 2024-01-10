import { _decorator } from 'cc'
import { ConfigLinkedT } from '../entity/ConfigT'
const { ccclass } = _decorator


@ccclass('ConfigData')
export abstract class ConfigData {
  public static linked: ConfigLinkedT
}