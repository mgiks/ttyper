import { expectationTables, text } from './fixtures'
import { getRightText } from './getRightText'

describe('getRightText', () => {
  it.each(expectationTables.getRightText)(
    `'${text}' with wrong key at $index is $expectedText`,
    ({ index, expectedText }) => {
      expect(getRightText(text, index)).toBe(expectedText)
    },
  )
})
