import type { ConversationInfo } from '../../../library'

type ConversationSettingsProps = {
  setIsOpen: (value: boolean) => void
  setMediaViewOpen: (value: boolean) => void
  conversation: ConversationInfo
}
export function ConversationSettings({
  setIsOpen,
  setMediaViewOpen,
  conversation,
}: ConversationSettingsProps) {
  const handleClose = () => {
    setMediaViewOpen(false)
  }
  return <div>hello</div>
}
