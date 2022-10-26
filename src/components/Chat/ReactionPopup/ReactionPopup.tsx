import type { Ref } from 'react'

type ReactionPopupProps = {
  position: 'left' | 'right'
  forwardedRef: Ref<HTMLDivElement>
  setIsOpen: (value: boolean) => void
  messageId: string
  currentReaction: number
}

export function ReactionPopup({
  position,
  forwardedRef,
  setIsOpen,
  messageId,
  currentReaction,
}: ReactionPopupProps) {
  return <div>ReactionPopup</div>
}
