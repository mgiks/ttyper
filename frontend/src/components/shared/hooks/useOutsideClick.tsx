import { useEffect, useRef } from "react"

export function useOutsideClick<THTMLElement extends HTMLElement>(callback: () => any) {
  const ref = useRef<THTMLElement>(null)
  const documentRef = useRef<Document>(document)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback() 
      }
    }

    documentRef.current.addEventListener('click', handleClick, true)

    return () => documentRef.current.removeEventListener('click', handleClick, true)
  })

  return ref 
}
