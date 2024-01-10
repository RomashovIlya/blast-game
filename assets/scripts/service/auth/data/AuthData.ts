import { _decorator } from 'cc'
const { ccclass } = _decorator


@ccclass('AuthData')
export abstract class AuthData {
  public static userID: string = ''
}