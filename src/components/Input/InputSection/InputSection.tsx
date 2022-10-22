import { Icon } from '@iconify/react'
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import {
  ChangeEvent,
  ClipboardEventHandler,
  FormEvent,
  Suspense,
  lazy,
  useEffect,
  useRef,
  useState,
} from 'react'
import { ImAttachment } from 'react-icons/im'
import { RiImageAddFill } from 'react-icons/ri'
import { VscSmiley } from 'react-icons/vsc'
import { useParams } from 'react-router-dom'

import { firebaseDb, firebaseStorage, useUserStore } from '../../../library'
import { Alerts } from '../../Alert/Alert'
import ClickAwayListener from '../../ClickAwayListener'
import { Spinner } from '../../Spinner/Spinner'
import {
  Container,
  Form,
  ImageButton,
  FileButton,
  InputWrapper,
  Input,
  EmojiButton,
  SendButton,
} from './style'

const Picker = lazy(() => import('../EmojiPicker/EmojiPicker'))

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
  const [inputValue, setInputValue] = useState('')
  const [fileUploading, setFileUploading] = useState(false)
  const [previewFiles, setPreviewFiles] = useState<string[]>([])
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false)

  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [alertText, setAlertText] = useState('')
  const [fileDragging, setFileDragging] = useState(false)

  const { id: conversationId } = useParams()
  const currentUser = useUserStore((state) => state.currentUser)

  const textInputRef = useRef<HTMLInputElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const updateTimestamp = () => {
    updateDoc(doc(firebaseDb, 'conversations', conversationId as string), {
      updatedAt: serverTimestamp(),
    })
  }

  useEffect(() => {
    const handler = () => {
      textInputRef.current?.focus()
    }
    window.addEventListener('focus', handler)
    return () => window.removeEventListener('focus', handler)
  }, [])

  useEffect(() => {
    textInputRef.current?.focus()
  }, [conversationId])

  return (
    <Container>
      <ImageButton onClick={() => imageInputRef.current?.click()}>
        <RiImageAddFill />
      </ImageButton>
      <input
        ref={imageInputRef}
        hidden
        type="file"
        accept="image/*"
        // onChange={handleFileInputChange}
      />
      <FileButton onClick={() => fileInputRef.current?.click()}>
        <ImAttachment />
      </FileButton>
      <input ref={fileInputRef} hidden type="file" />

      <Form>
        <InputWrapper>
          <Input
            maxLength={1000}
            disabled={disabled}
            ref={textInputRef}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value)
            }}
            // onKeyDown={handleReplaceEmoji}
            // onPaste={handlePaste}
            type="text"
            placeholder="Message..."
          />
          <EmojiButton type="button" onClick={() => setIsEmojiPickerOpen(true)}>
            <Icon icon="octicon:smiley-16" />
          </EmojiButton>

          {isEmojiPickerOpen && (
            <ClickAwayListener onClickAway={() => setIsEmojiPickerOpen(false)}>
              {(ref) => (
                <div ref={ref} className="absolute bottom-full right-0">
                  <Suspense
                    fallback={
                      <div className="flex h-[357px] w-[348px] items-center justify-center rounded-lg border-2 border-[#555453] bg-[#222222]">
                        <Spinner />
                      </div>
                    }
                  >
                    {/* <Picker
                        onSelect={(emoji: any) => addIconToInput(emoji.native)}
                      /> */}
                  </Suspense>
                </div>
              )}
            </ClickAwayListener>
          )}
        </InputWrapper>
        {fileUploading ? (
          <div className="ml-1 flex items-center">
            <Spinner></Spinner>
          </div>
        ) : (
          <SendButton className="text-primary flex flex-shrink-0 items-center text-2xl">
            <Icon icon="heroicons:paper-airplane-solid" />
          </SendButton>
        )}
      </Form>
    </Container>
  )
}
