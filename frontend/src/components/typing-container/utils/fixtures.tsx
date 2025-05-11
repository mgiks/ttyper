export const text =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ornare nulla turpis. Quisque accumsan nibh ante, ut pellentesque ligula suscipit non. Quisque et auctor velit, vitae consectetur odio. Quisque consequat eget sapien eu elementum.'
const indices = [-10, -1, 0, 2, 10, 100]
export const textarea = <textarea data-testid='typing-area'></textarea>

export const expectationTables = {
  getRightText: indices.map((i) => ({
    index: i,
    expectedText: i > -1 ? text.slice(0, i) : text,
  })),
  getWrongText: indices.map((i) => ({
    index: i,
    expectedText: i > -1 ? text.slice(i) : '',
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
