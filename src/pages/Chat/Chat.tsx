import type { ConversationInfo } from '../../library'

import { doc } from 'firebase/firestore'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { ChatHeader, ChatView, InputSection, Sidebar } from '../../components'
import { useDocumentQuery } from '../../hooks/useDocumentQuery'
import { useUserStore } from '../../library'
import { firebaseDb } from '../../library'
import { ChatWrapper, Error, Text, Image, Wrapper, Line, Grow } from './style'

import ERROR_IMAGE from '/public/error.png'
export function Chat() {
  const { id } = useParams()
  const { data, loading, error } = useDocumentQuery(
    `conversation-${id}`,
    doc(firebaseDb, 'conversations', id as string)
  )

  const conversation = data?.data() as ConversationInfo
  const currentUser = useUserStore((state) => state.currentUser)
  const [inputSectionOffset, setInputSectionOffset] = useState(0)
  const [replyInfo, setReplyInfo] = useState(null)

  return (
    <Wrapper>
      <Sidebar />
      <ChatWrapper>
        {loading ? (
          <>
            <Line />
            <Grow />
            <InputSection />
          </>
        ) : !conversation ||
          error ||
          !conversation.users.includes(currentUser?.uid as string) ? (
          <Error>
            <Image src={ERROR_IMAGE} alt="" />
            <Text>Conversation does not exists</Text>
          </Error>
        ) : (
          <>
            <ChatHeader conversation={conversation} />
            <ChatView
              replyInfo={replyInfo}
              setReplyInfo={setReplyInfo}
              inputSectionOffset={inputSectionOffset}
              conversation={conversation}
            />
            <InputSection
              setInputSectionOffset={setInputSectionOffset}
              replyInfo={replyInfo}
              setReplyInfo={setReplyInfo}
              disabled={false}
            />
          </>
        )}
      </ChatWrapper>
    </Wrapper>
  )
}
