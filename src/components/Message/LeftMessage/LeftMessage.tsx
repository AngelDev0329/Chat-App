/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ConversationInfo, MessageItem } from '../../../library'

import { Icon } from '@iconify/react'
import { Fragment, useState } from 'react'
import { BsFillReplyFill } from 'react-icons/bs'
import { VscSmiley } from 'react-icons/vsc'

import { formatFileSize, splitLinkFromMessage } from '../../../library'
import { formatDate, useUserStore } from '../../../library'
import { ReactionPopup, ReactionStatus, ReplyBadge } from '../../Chat'
import AvatarFromId from '../../Chat/AvatarFormId/AvatarFormId'
import ClickAwayListener from '../../ClickAwayListener'
import FileIcon from '../../Media/Files/FileIcon'

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
  const [isSelectReactionOpen, setIsSelectReactionOpen] = useState(false)
  const currentUser = useUserStore((state) => state.currentUser)

  const [isImageViewOpened, setIsImageViewOpened] = useState(false)

  const formattedDate = formatDate(
    message.createdAt.seconds ? message.createdAt.seconds * 1000 : Date.now()
  )

  return (
    <div id={`message-${message.id}`}>
      <div className={conversation.users.length === 2 ? 'px-8' : 'px-[70px]'}>
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
        {conversation.users.length > 2 && (
          <div onClick={(event) => event.stopPropagation()}>
            <div>
              {docs[index - 1]?.data()?.sender !== message.sender && (
                <AvatarFromId uid={message.sender} />
              )}
            </div>
          </div>
        )}

        {message.type === 'text' ? (
          <div
            onClick={(event) => event.stopPropagation()}
            title={formattedDate}
            className={conversation.users.length === 2 ? 'bom' : ''}
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
          <img
            onClick={(event) => {
              setIsImageViewOpened(true)
              event.stopPropagation()
            }}
            title={formattedDate}
            src={message.content}
            alt=""
          />
        ) : message.type === 'file' ? (
          <div onClick={(e) => e.stopPropagation()} title={formattedDate}>
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
              />{' '}
            </a>
          </div>
        ) : (
          <div onClick={(e) => e.stopPropagation()} title={formattedDate}>
            Message has been removed
          </div>
        )}

        {message.type !== 'removed' && (
          <>
            <button onClick={() => setIsSelectReactionOpen(true)}>
              <VscSmiley />
            </button>
            <button
              onClick={(e) => {
                setReplyInfo(message)
                e.stopPropagation()
              }}
            >
              <BsFillReplyFill />
            </button>

            {isSelectReactionOpen && (
              <ClickAwayListener
                onClickAway={() => setIsSelectReactionOpen(false)}
              >
                {(ref) => (
                  <ReactionPopup
                    position={'left'}
                    forwardedRef={ref}
                    setIsOpen={setIsSelectReactionOpen}
                    messageId={message.id as string}
                    currentReaction={
                      message.reactions?.[currentUser?.uid as string] || 0
                    }
                  />
                )}
              </ClickAwayListener>
            )}
          </>
        )}
        {Object.keys(message.reactions || {}).length > 0 && (
          <ReactionStatus
            message={message}
            position={conversation.users.length > 2 ? 'left-tab' : 'left'}
          />
        )}
      </div>
    </div>
  )
}
