import { extractWrongText } from '../extractWrongText'
import { extractWrongTextExpectationTable, text } from './fixtures'

describe('extractWrongText', () => {
  describe(`extraction from '${text}'`, () => {
    it.each(extractWrongTextExpectationTable)(
      `should extract $expected from wrong key at $index`,
      ({ index, expected }) => {
        expect(extractWrongText(text, index)).toBe(expected)
      },
    )
  })
})
