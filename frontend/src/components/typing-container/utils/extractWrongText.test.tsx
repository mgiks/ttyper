import { expectationTables, text } from './fixtures'
import { extractWrongText } from './extractWrongText'

describe('getWrongText', () => {
  it.each(expectationTables.getWrongText)(
    `'${text}' with wrong key at $index is $expectedText`,
    ({ index, expectedText }) => {
      expect(extractWrongText(text, index)).toBe(expectedText)
    },
  )
})
