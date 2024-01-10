import { Game, _decorator, game } from 'cc'
const { ccclass } = _decorator


@ccclass('GlobalTime')
export abstract class GlobalTime {
  private static _sessionSeconds: number = -1
  private static _currentUnixTime: number = -1

  // GETTER
  public static get sessionSeconds(): number {
    return this._sessionSeconds
  }
  
  public static get currentUnixTime(): number {
    return this._currentUnixTime
  }

  
  // INIT - BOOT
  public static init() {
    const startTime = this.getCurrentUTC()

    // START GLOBAL TIMER
    if (this._sessionSeconds == -1) {
      this._sessionSeconds = 0
      this._currentUnixTime = startTime

      setInterval(this.secondPassed.bind(this), 1000)
    }

    game.on(Game.EVENT_SHOW, this.updateCurrentTime, this)
  }

  
  // PRIVATE
  private static secondPassed() {
    this._sessionSeconds++
    this._currentUnixTime++
  }

  private static updateCurrentTime() {
    this._currentUnixTime = this.getCurrentUTC()
  }

  private static getCurrentUTC(): number {
    return Math.round(new Date().getTime() / 1000)
  }

  
  // RESET - BOOT
  public static reset() {
    game.off(Game.EVENT_SHOW, this.updateCurrentTime, this)

    this._sessionSeconds = 0
    this._currentUnixTime = this.getCurrentUTC()
  }
}
