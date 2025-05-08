import { expectationTables } from './fixtures'
import { isControlKey } from './isControlKey'

describe('isControlKey', () => {
  it.each(expectationTables.isControlKey)(
    'isControlKey($key) === $expected',
    ({ key, expected }) => {
      expect(isControlKey(key)).toBe(expected)
    },
  )
})
