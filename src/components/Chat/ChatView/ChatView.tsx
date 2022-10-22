import type { ConversationInfo } from '../../../library'

type ChatViewProps = {
  replyInfo: null
  setReplyInfo: React.Dispatch<React.SetStateAction<null>>
  inputSectionOffset: number
  conversation: ConversationInfo
}

export function ChatView({
  replyInfo,
  setReplyInfo,
  inputSectionOffset,
}: ChatViewProps) {
  return <div>ChatView</div>
}
