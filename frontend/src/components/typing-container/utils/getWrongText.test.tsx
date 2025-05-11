import { expectationTables, text } from './fixtures'
import { getWrongText } from './getWrongText'

describe('getWrongText', () => {
  it.each(expectationTables.getWrongText)(
    `'${text}' with wrong key at $index is $expectedText`,
    ({ index, expectedText }) => {
      expect(getWrongText(text, index)).toBe(expectedText)
    },
  )
})
