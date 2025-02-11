import { useRef } from "react"
import { useOutsideClick } from "./useOutsideClick"
import { useOutsideKeypress } from "./useOutsideKeypress"


export function useOutsideClickAndKeyPress<THTMLElement extends HTMLElement>(
  clickCallback: () => any, 
  keypressCallback: () => any, 
  refObj: React.RefObject<THTMLElement>, 
) {
  let ref = typeof refObj == 'undefined' ? useRef<THTMLElement>(null) : refObj

  useOutsideClick<THTMLElement>(clickCallback, ref)
  useOutsideKeypress<THTMLElement>(keypressCallback, ref)

  return ref 
}
