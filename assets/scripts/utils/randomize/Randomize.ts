import { _decorator } from 'cc'
import { Shuffle } from '../shuffle/Shuffle'
const { ccclass } = _decorator


@ccclass('Randomize')
export abstract class Randomize {
  // INTERFACE
  public static getIntInclusive(min: number, max: number): number {
    if (max === 0) return 0
    if (min === max) return max
    
    min = Math.ceil(min)
    max = Math.floor(max)

    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  public static getOriginalLimitedList<T>(configList: T[], limit: number): T[] {
    let list = configList

    Shuffle.list(list)
    Shuffle.list(list)

    list.length = limit

    return list
  }

  public static getLimitedList<T>(configList: T[], limit: number): T[] {
    let list = []

    if (configList.length === 1) {
      const [item] = configList
      
      list = new Array(limit).fill(item)
    }

    if (configList.length > 1) {
      for (const item of configList) {
        list = [...list, ...new Array(limit).fill(item)]
      }

      Shuffle.list(list)
      Shuffle.list(list)

      list.length = limit
    }

    return list
  }
}