import { expectationTables, randomText } from './fixtures'
import { getWrongText } from './getWrongText'

describe('getWrongText', () => {
  it.each(expectationTables.getWrongText)(
    `'${randomText}' with wrong key at $index is $expectedText`,
    ({ index, expectedText }) => {
      expect(getWrongText(randomText, index)).toBe(expectedText)
    },
  )
})
