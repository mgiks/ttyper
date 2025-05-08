import { faker } from '@faker-js/faker/locale/mk'

export const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
export const randomText = faker.lorem.sentences(3)
const indices = [-10, -1, 0, 2, 10, 100]
export const textarea = <textarea data-testid='typing-area'></textarea>

export const expectationTables = {
  getRightText: indices.map((i) => ({
    index: i,
    expectedText: i > -1 ? randomText.slice(0, i) : randomText,
  })),
  getWrongText: indices.map((i) => ({
    index: i,
    expectedText: i > -1 ? randomText.slice(i) : '',
  })),
  isControlKey: [
    { key: 'Shift', expected: true },
    { key: 'Meta', expected: true },
    { key: 'Alt', expected: true },
    { key: 'Control', expected: true },
    { key: 'Backspace', expected: false },
    { key: 'w', expected: false },
    { key: 'a', expected: false },
    { key: 's', expected: false },
    { key: 'd', expected: false },
    { key: ' ', expected: false },
  ],
}
