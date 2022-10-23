import type { ConversationInfo } from '../../../library'

import { Skeleton } from '@mui/material'
import { BsCircleFill } from 'react-icons/bs'
import { Link, useParams } from 'react-router-dom'

import { useLastMessage, useUsersInfo } from '../../../hooks'
import { IMAGE_PROXY } from '../../../library'
import { useUserStore } from '../../../library'
import { Flex, Image, LastMessage, Name, Notify } from './style'

import '../../../styles/index.css'
type SelectConversationProps = {
  conversation: ConversationInfo
  conversationId: string
}

export function SelectConversation({
  conversation,
  conversationId,
}: SelectConversationProps) {
  const { data: users, loading } = useUsersInfo(conversation.users)
  const currentUser = useUserStore((state) => state.currentUser)

  const filtered = users?.filter((user) => user.id !== currentUser?.uid)

  const { id } = useParams()

  const {
    data: lastMessage,
    loading: lastMessageLoading,
    error: lastMessageError,
  } = useLastMessage(conversationId)

  if (loading)
    return (
      <Flex>
        <Skeleton variant="circular" width={65} height={65} sx={{ mr: 1.5 }} />
        <div>
          <Skeleton
            width={100}
            height={15}
            sx={{ mb: 1 }}
            variant="rectangular"
          />
          <Skeleton variant="rectangular" width={140} height={15} />
        </div>
      </Flex>
    )
  if (conversation.users.length === 2)
    return (
      <Link to={`/${conversationId}`} style={{ textDecoration: 'none' }}>
        <Flex className={conversationId === id ? 'active' : 'not-active'}>
          <Image src={IMAGE_PROXY(filtered?.[0]?.data()?.photoURL)} alt="" />
          <div>
            <Name>{filtered?.[0].data()?.displayName}</Name>
            <LastMessage>{lastMessage?.message}</LastMessage>
          </div>
          {!lastMessageLoading && (
            <>
              {lastMessage?.lastMessageId !== null &&
                lastMessage?.lastMessageId !==
                  conversation.seen[currentUser?.uid as string] && (
                  <Notify>
                    <BsCircleFill />
                  </Notify>
                )}
            </>
          )}
        </Flex>
      </Link>
    )
  return ''
}
