import { useEffect, useRef } from 'react'

export function useOutsideKeypress<THTMLElement extends HTMLElement>(
  callback: () => any,
  refObj?: React.RefObject<THTMLElement>,
) {
  let ref = typeof refObj == 'undefined' ? useRef<THTMLElement>(null) : refObj
  const documentRef = useRef<Document>(document)
  const event = 'keydown'

  useEffect(() => {
    const handleKeypress = (e: KeyboardEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback()
      }
    }
    documentRef.current.addEventListener(event, handleKeypress, true)
    return () =>
      documentRef.current.removeEventListener(event, handleKeypress, true)
  }, [])

  return ref
}
