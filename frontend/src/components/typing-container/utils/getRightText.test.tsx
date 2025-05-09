import { expectationTables, randomText } from './fixtures'
import { getRightText } from './getRightText'

describe('getRightText', () => {
  it.each(expectationTables.getRightText)(
    `'${randomText}' with wrong key at $index is $expectedText`,
    ({ index, expectedText }) => {
      expect(getRightText(randomText, index)).toBe(expectedText)
    },
  )
})
