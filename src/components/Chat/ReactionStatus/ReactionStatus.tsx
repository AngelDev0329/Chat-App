import type { MessageItem } from '../../../library'

type ReactionStatusProps = {
  position: 'left' | 'right' | 'left-tab'
  message: MessageItem
}

export function ReactionStatus({ message, position }: ReactionStatusProps) {
  return <div>ReactionStatus</div>
}
