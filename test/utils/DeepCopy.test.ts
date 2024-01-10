import { equal } from 'node:assert/strict'
import { DeepCopy } from '../../assets/scripts/utils/deep-copy/DeepCopy'

describe('DeepCopy check', () => {
  it('should object equal with clone', () => {
    const target = [{ 'n': 1 }, { 'n': 2, 'm': 3 }]
    const result = DeepCopy.clone(target)

    for (let i = 0; i < target.length; i++) {
      for (const [targetKey, targetValue] of Object.entries(target[i])) {
        equal(targetValue, result[i][targetKey])
      }
    }
  })
})