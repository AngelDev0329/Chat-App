type InputHeaderProps = {
  disabled: boolean
  replyInfo: null
  setReplyInfo: React.Dispatch<React.SetStateAction<null>>
  setInputSectionOffset: React.Dispatch<React.SetStateAction<number>>
}
export function InputSection({
  disabled,
  replyInfo,
  setReplyInfo,
  setInputSectionOffset,
}: InputHeaderProps) {
  return <div>InputSection</div>
}
