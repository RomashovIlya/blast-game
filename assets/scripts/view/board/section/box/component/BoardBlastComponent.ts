import { Component, ParticleSystem2D, _decorator } from 'cc'
const { ccclass, property } = _decorator


@ccclass('BoardBlastComponent')
export class BoardBlastComponent extends Component {
  @property(ParticleSystem2D)
  readonly mainPS: ParticleSystem2D
}
