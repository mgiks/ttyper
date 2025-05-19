export const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
export const textarea = <textarea data-testid='typing-area'></textarea>

export const extractCorrectTextExpectationTable = [
  {
    index: -10,
    expected: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  { index: 0, expected: '' },
  { index: 10, expected: 'Lorem ipsu' },
  {
    index: 1000,
    expected: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
]

export const extractWrongTextExpectationTable = [
  {
    index: -10,
    expected: '',
  },
  {
    index: 0,
    expected: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  { index: 10, expected: 'm dolor sit amet, consectetur adipiscing elit.' },
  {
    index: 1000,
    expected: '',
  },
]

export const isControlKeyExpectationTable = [
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
  { key: '', expected: false },
]
