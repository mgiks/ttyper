import { expectationTables, text } from './fixtures'
import { extractCorrectText } from './extractCorrectText'

describe('getRightText', () => {
  it.each(expectationTables.getRightText)(
    `'${text}' with wrong key at $index is $expectedText`,
    ({ index, expectedText }) => {
      expect(extractCorrectText(text, index)).toBe(expectedText)
    },
  )
})
