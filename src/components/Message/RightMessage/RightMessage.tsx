/* eslint-disable @typescript-eslint/no-explicit-any */
import type { MessageItem } from '../../../library'

import { Icon } from '@iconify/react'
import { updateDoc, doc } from 'firebase/firestore'
import { Fragment, useState } from 'react'
import { BsFillReplyFill } from 'react-icons/bs'
import { FaTrashAlt } from 'react-icons/fa'
import { VscSmiley } from 'react-icons/vsc'
import { useParams } from 'react-router-dom'

import { formatFileSize } from '../../../library'
import { splitLinkFromMessage } from '../../../library'
import { formatDate } from '../../../library'
import { firebaseDb } from '../../../library'
import { useUserStore } from '../../../library'
import { ReactionPopup, ReactionStatus, ReplyBadge } from '../../Chat'
import FileIcon from '../../Media/Files/FileIcon'

type RightMessageProps = {
  message: MessageItem
  replyInfo: any
  setReplyInfo: (value: any) => void
}

export function RightMessage({ message, setReplyInfo }: RightMessageProps) {
  const [isSelectReactionOpen, setIsSelectReactionOpen] = useState(false)

  const { id: conversationId } = useParams()

  const currentUser = useUserStore((state) => state.currentUser)

  const removeMessage = (messageId: string) => {
    updateDoc(
      doc(
        firebaseDb,
        'conversations',
        conversationId as string,
        'messages',
        messageId
      ),
      {
        type: 'removed',
        file: null,
        content: '',
        reactions: [],
      }
    )
  }

  const formattedDate = formatDate(
    message.createdAt?.seconds ? message.createdAt?.seconds * 1000 : Date.now()
  )
  return (
    <div id={`message-${message.id}`}>
      <div>
        {!!message.replyTo && (
          <ReplyBadge messageId={message.replyTo as string} />
        )}
      </div>
      <div
        onClick={(event) => {
          if (event.detail === 2 && message.type !== 'removed') {
            setReplyInfo(message)
          }
        }}
        className={
          Object.keys(message.reactions || {}).length > 0 ? 'mb-2' : ''
        }
      >
        {message.type === 'text' ? (
          <div
            onClick={(event) => event.stopPropagation()}
            title={formattedDate}
          >
            {splitLinkFromMessage(message.content).map((item, index) => (
              <Fragment key={index}>
                {typeof item === 'string' ? (
                  <span>{item}</span>
                ) : (
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    {item.link}
                  </a>
                )}
              </Fragment>
            ))}
          </div>
        ) : message.type === 'image' ? (
          <img title={formattedDate} src={message.content} alt="" />
        ) : message.type === 'file' ? (
          <div
            onClick={(event) => event.stopPropagation()}
            title={formattedDate}
          >
            <FileIcon
              extension={message.file?.name.split('.').slice(-1)[0] as string}
            />
            <div>
              <p>{message.file?.name}</p>

              <p>{formatFileSize(message.file?.size as number)}</p>
            </div>

            <a
              href={message.content}
              download
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon
                icon="ic:baseline-download"
                style={{
                  fontSize: '1.4rem',
                  color: '#4b5563',
                }}
              />
            </a>
          </div>
        ) : (
          <div
            onClick={(event) => event.stopPropagation()}
            title={formattedDate}
          >
            Message has been removed
          </div>
        )}

        {message.type !== 'removed' && (
          <>
            <button
              onClick={() => setIsSelectReactionOpen(!isSelectReactionOpen)}
            >
              <VscSmiley />
            </button>

            <button
              onClick={(event) => {
                setReplyInfo(message)
                event.stopPropagation()
              }}
            >
              <BsFillReplyFill />
            </button>

            <button
              onClick={(event) => {
                removeMessage(message.id as string)
                event.stopPropagation()
              }}
            >
              <FaTrashAlt />
            </button>

            {isSelectReactionOpen && (
              <ReactionPopup
                position="right"
                setIsOpen={setIsSelectReactionOpen}
                messageId={message.id as string}
                currentReaction={
                  message.reactions?.[currentUser?.uid as string] || 0
                }
              />
            )}

            {Object.keys(message.reactions || {}).length > 0 && (
              <ReactionStatus message={message} position="right" />
            )}
          </>
        )}
      </div>
    </div>
  )
}
