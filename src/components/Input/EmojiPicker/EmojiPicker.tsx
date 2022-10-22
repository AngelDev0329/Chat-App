/* eslint-disable @typescript-eslint/no-explicit-any */
import { Picker } from 'emoji-mart'

type EmojiPickerProps = {
  onSelect: (emoji: any) => void
}

const EmojiPicker = ({ onSelect }: EmojiPickerProps) => {
  return (
    <Picker
      set="facebook"
      enableFrequentEmojiSort
      onSelect={onSelect}
      theme="light"
      showPreview={false}
      showSkinTones={false}
      emojiTooltip
      defaultSkin={1}
      color="#0F8FF3"
    />
  )
}

export default EmojiPicker
