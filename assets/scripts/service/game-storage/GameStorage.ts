import { _decorator, sys } from 'cc'
import { AuthData } from '../auth/data/AuthData'
import { GameStorageE } from './entity/GameStorageE'
const { ccclass } = _decorator


@ccclass('GameStorage')
export abstract class GameStorage {
  private static _keySuffix: string = ''
  private static _inited: boolean = false

  
  // INIT - BOOT
  public static init() {
    if (this._inited) return

    this._keySuffix = AuthData.userID
    this._inited = true
  }

  
  // INTERFACE
  public static getItem(name: keyof typeof GameStorageE): any | null {
    if (!this._inited) throw new Error('STORAGE not initialized')
    
    const keyName = this.getKeyName(name)
    const localValue = sys.localStorage.getItem(keyName)

    return localValue ? JSON.parse(localValue) : null
  }

  public static setItem<T = Record<string, any>>(name: keyof typeof GameStorageE, value: T) {
    if (!this._inited) throw new Error('STORAGE not initialized')

    const keyName = this.getKeyName(name)
    sys.localStorage.setItem(keyName, JSON.stringify(value))
  }

  public static removeItem(name: keyof typeof GameStorageE) {
    if (!this._inited) throw new Error('STORAGE not initialized')

    const keyName = this.getKeyName(name)
    sys.localStorage.removeItem(keyName)
  }

  
  // PRIVATE
  private static getKeyName(name: string): string {
    const keyName = `${name}_${this._keySuffix}`
    return keyName
  }

  
  // RESET - BOOT
  public static reset() {
    this._keySuffix = ''
    this._inited = false
  }
}