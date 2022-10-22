/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ConversationInfo } from '../../../library'

import { limitToLast, orderBy, query, collection } from 'firebase/firestore'
import { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useParams } from 'react-router-dom'

import { useCollectionQuery } from '../../../hooks'
import { firebaseDb } from '../../../library'
import { Spinner } from '../../Spinner/Spinner'

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
  return (
    <div
      style={{ height: `calc(100vh - ${144 + inputSectionOffset}px)` }}
    ></div>
  )
}
