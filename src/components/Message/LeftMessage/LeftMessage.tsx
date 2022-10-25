/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ConversationInfo, MessageItem } from '../../../library'

type LeftMessageProps = {
  message: MessageItem
  conversation: ConversationInfo
  index: number
  docs: any[]
  replyInfo: any
  setReplyInfo: (value: any) => void
}

export function LeftMessage({
  message,
  conversation,
  index,
  docs,
  setReplyInfo,
}: LeftMessageProps) {
  return <div>RightMessage</div>
}
