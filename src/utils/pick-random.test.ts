import { pickRandom } from './pick-random'

describe('pickRandom', () => {
  it('should pick random item of items', () => {
    const items = [1, 2, 3]
    const randomItem = pickRandom(items)

    expect(items.includes(randomItem)).toBe(true)
  })
})
