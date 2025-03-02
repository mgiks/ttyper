import { useEffect, useRef } from 'react'

export function useOutsideClick<THTMLElement extends HTMLElement>(
  callback: () => any,
  refObj?: React.RefObject<THTMLElement>,
) {
  let ref = typeof refObj == 'undefined' ? useRef<THTMLElement>(null) : refObj
  const documentRef = useRef<Document>(document)
  const event = 'pointerdown'

  useEffect(() => {
    const handleClick = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback()
      }
    }
    documentRef.current.addEventListener(event, handleClick, true)
    return () =>
      documentRef.current.removeEventListener(event, handleClick, true)
  }, [])

  return ref
}
