import { extractCorrectText } from '../extractCorrectText'
import { extractCorrectTextExpectationTable, text } from './fixtures'

describe('extractCorrectText', () => {
  describe(`extraction from '${text}'`, () => {
    it.each(extractCorrectTextExpectationTable)(
      `should extract $expected from wrong key at $index`,
      ({ index, expected }) => {
        expect(extractCorrectText(text, index)).toBe(expected)
      },
    )
  })
})
