import { Node, Vec3, _decorator, tween } from 'cc'
const { ccclass } = _decorator

export type MovementT = {
  node: Node
  delay: number
  duration: number
  position: Vec3
}


@ccclass('MovementCallbackHandler')
export class MovementCallbackHandler {
  public moveEnd() {
    throw new Error('moveEnd method should be implemented')
  }
}


@ccclass('Movement')
export class Movement {
  handler: MovementCallbackHandler
  
  constructor(handler: MovementCallbackHandler) {
    this.handler = handler
  }

  public move(data: MovementT) {
    tween(data.node)
    .delay(data.delay)
    .to(data.duration,
      { position: data.position },
      { onComplete: () => {
        this.handler.moveEnd()
      }})
    .start()
  }
}
