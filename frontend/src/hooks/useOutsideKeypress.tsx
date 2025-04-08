import { useEffect, useRef } from 'react'
import { isControlKey } from '../components/typing-container/utils/isControlKey'

export function useOutsideKeypress<THTMLElement extends HTMLElement>(
  callback: () => any,
  refObj?: React.RefObject<THTMLElement | null>,
) {
  let ref = typeof refObj === 'undefined' ? useRef<THTMLElement>(null) : refObj
  const documentRef = useRef<Document>(document)
  const event = 'keydown'

  useEffect(() => {
    const handleKeypress = (e: KeyboardEvent) => {
      if (isControlKey(e.key)) return
      callback()
    }
    documentRef.current.addEventListener(event, handleKeypress, true)
    return () =>
      documentRef.current.removeEventListener(event, handleKeypress, true)
  }, [])

  return ref
}
