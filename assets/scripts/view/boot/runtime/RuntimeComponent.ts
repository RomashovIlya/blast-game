import { Component, _decorator } from 'cc'
const { ccclass } = _decorator

const RUNTIME_DELTA = 0.01

interface RuntimeComponentI {
  runtime(): void
}


@ccclass('RuntimeComponent')
export class RuntimeComponent extends Component {
  private _timer = 0
  private _handler: RuntimeComponentI

  
  // INIT
  public init(handler: RuntimeComponentI) {
    this._handler = handler
  }

  
  // UPDATE
  protected update(deltaTime: number) {
    this._timer += deltaTime
    
    if (this._timer >= RUNTIME_DELTA) {
      this._timer = 0
      this._handler.runtime()
    }
  }
}