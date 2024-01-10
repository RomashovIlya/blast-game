import { _decorator } from 'cc'
import { AuthData } from './data/AuthData'
const { ccclass } = _decorator


@ccclass('Auth')
export abstract class Auth {
  // INIT - BOOT
  public static init() {
    AuthData.userID = 'defaultBlastID'
  }

  
  // RESET - BOOT
  public static reset() {
    AuthData.userID = ''
  }
}