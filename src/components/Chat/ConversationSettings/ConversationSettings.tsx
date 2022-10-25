import type { ConversationInfo } from '../../../library'
import type { ChangeEvent, FormEvent } from 'react'

import { Dialog } from '@mui/material'
import { updateDoc, doc, arrayRemove } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useRef, useState } from 'react'
import {
  FiChevronDown,
  FiChevronUp,
  FiEdit3,
  FiFile,
  FiImage,
  FiLogOut,
  FiX,
} from 'react-icons/fi'
import { useNavigate, useParams } from 'react-router-dom'

import { firebaseStorage, formatFileName } from '../../../library'
import { firebaseDb } from '../../../library'
import { useUserStore } from '../../../library'
import { AlertMessage } from '../../Alert'

type ConversationSettingsProps = {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  setMediaViewOpen: (value: boolean) => void
  conversation: ConversationInfo
}
export function ConversationSettings({
  isOpen,
  setIsOpen,
  setMediaViewOpen,
  conversation,
}: ConversationSettingsProps) {
  const { id: conversationId } = useParams()

  const currentUser = useUserStore((state) => state.currentUser)

  const navigate = useNavigate()

  const [isChangeChatNameOpen, setIsChangeChatNameOpen] = useState(false)

  const [chatNameInputValue, setChatNameInputValue] = useState(
    conversation?.group?.groupName || ''
  )

  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [alertText, setAlertText] = useState('')

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault()

    if (!chatNameInputValue.trim()) return

    setIsOpen(false)
    updateDoc(doc(firebaseDb, 'conversations', conversationId as string), {
      'group.groupName': chatNameInputValue.trim(),
    })
  }

  const handleFileInputChange = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]

    if (!file) return

    if (!file.type.startsWith('image')) {
      setAlertText('FIle is not an image')
      setIsAlertOpen(true)
      return
    }
    const FIVE_MB = 1024 * 1024 * 5

    if (file.size > FIVE_MB) {
      setAlertText('Max image size is 20MB')
      setIsAlertOpen(true)
      return
    }

    setIsAlertOpen(false)

    const fileReference = ref(firebaseStorage, formatFileName(file.name))
    await uploadBytes(fileReference, file)

    const downloadURL = await getDownloadURL(fileReference)

    updateDoc(doc(firebaseDb, 'conversations', conversationId as string), {
      'group.groupImage': downloadURL,
    })
  }

  const leaveGroup = () => {
    updateDoc(doc(firebaseDb, 'conversations', conversationId as string), {
      users: arrayRemove(currentUser?.uid as string),
      'group.admins': arrayRemove(currentUser?.uid as string),
      'group.groupImage': conversation.group?.groupImage,
      'group.groupName': conversation.group?.groupName,
    })

    navigate('/')
  }

  const handleClose = () => {
    setIsOpen(false)
  }
  return (
    <Dialog onClose={handleClose} open={isOpen}>
      <div
        onClick={() => setIsOpen(false)}
        className={`animate-fade-in fixed top-0 left-0 z-20 flex h-full w-full items-center justify-center bg-[#00000080] transition-all duration-300`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-dark mx-2 w-full max-w-[500px] rounded-lg"
        >
          <div className="border-dark-lighten flex items-center justify-between border-b py-3 px-3">
            <h1>Conversation settings</h1>
            <button onClick={() => setIsOpen(false)}>
              <FiX />
            </button>
          </div>

          <div>
            {conversation.users.length > 2 && (
              <>
                <button
                  onClick={() => setIsChangeChatNameOpen((prev) => !prev)}
                >
                  <div>
                    <FiEdit3 /> Change chat name
                  </div>

                  {isChangeChatNameOpen ? <FiChevronUp /> : <FiChevronDown />}
                </button>
                {isChangeChatNameOpen && (
                  <form onSubmit={handleFormSubmit}>
                    <input
                      value={chatNameInputValue}
                      onChange={(e) => setChatNameInputValue(e.target.value)}
                      type="text"
                      placeholder="Chat name"
                    />
                    <button>Change</button>
                  </form>
                )}
                <button onClick={() => fileInputRef.current?.click()}>
                  <FiImage />
                  <span>Change group photo</span>
                </button>

                <input
                  hidden
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileInputChange}
                />

                <AlertMessage
                  isOpen={isAlertOpen}
                  setIsOpen={setIsAlertOpen}
                  text={alertText}
                  isError
                />
              </>
            )}

            <button
              onClick={() => {
                setIsOpen(false)
                setMediaViewOpen(true)
              }}
            >
              <FiFile /> View images & files
            </button>

            {conversation.users.length > 2 && (
              <button onClick={() => leaveGroup()}>
                <FiLogOut /> Leave group
              </button>
            )}
          </div>
        </div>
      </div>
    </Dialog>
  )
}
