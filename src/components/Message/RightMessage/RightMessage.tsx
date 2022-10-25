/* eslint-disable @typescript-eslint/no-explicit-any */
import type { MessageItem } from '../../../library'

type RightMessageProps = {
  message: MessageItem
  replyInfo: any
  setReplyInfo: (value: any) => void
}

export function RightMessage({ message, setReplyInfo }: RightMessageProps) {
  return <div>RightMessage</div>
}
