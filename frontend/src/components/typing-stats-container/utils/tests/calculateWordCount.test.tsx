import {
  emptyText,
  emptyTextWithWhitespaces,
  text,
  textWithVaryingWhitespaceLength,
} from './fixtures'
import { calculateWordCount } from '../calculateWordCount'

describe('calculateWordCount', () => {
  it('should count 8 words from regular text', () =>
    expect(calculateWordCount(text)).toBe(8))
  it('should count 0 words from empty text', () =>
    expect(calculateWordCount(emptyText)).toBe(0))
  it('should count 0 words from text with spaces only', () =>
    expect(calculateWordCount(emptyTextWithWhitespaces)).toBe(0))
  it('should count 8 words from text with varying space length', () =>
    expect(calculateWordCount(textWithVaryingWhitespaceLength)).toBe(8))
})
