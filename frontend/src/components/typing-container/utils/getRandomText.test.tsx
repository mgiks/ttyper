import { getRandomText } from './getRandomText'

describe('getRandomText', () => {
  it('receive text', async () => {
    expect(await getRandomText()).toBeDefined()
  })
})
