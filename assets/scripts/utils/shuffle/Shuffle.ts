import { _decorator } from 'cc'
const { ccclass } = _decorator


@ccclass('Shuffle')
export abstract class Shuffle {
  // INTERFACE
  public static list<T>(array: T[]) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1))
        ;[array[i], array[j]] = [array[j], array[i]]
    }
  }
}
