/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from 'react'

type ClickAwayListenerProps = {
  onClickAway: () => void
  children: (ref: any) => any
}

const ClickAwayListener = ({
  children,
  onClickAway,
}: ClickAwayListenerProps) => {
  const childrenRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handler = (event: any) => {
      if (childrenRef.current && !childrenRef.current.contains(event.target)) {
        onClickAway()
      }
    }

    window.addEventListener('click', handler)

    return () => window.removeEventListener('click', handler)
  }, [])

  return <>{children(childrenRef)}</>
}

export default ClickAwayListener
