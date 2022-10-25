/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ConversationInfo } from '../../../library'

import {
  limitToLast,
  orderBy,
  query,
  collection,
  updateDoc,
  doc,
} from 'firebase/firestore'
import { useEffect, useRef, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useParams } from 'react-router-dom'

import { useCollectionQuery } from '../../../hooks'
import { useUserStore } from '../../../library'
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
  const { id: conversationId } = useParams()
  const currentUser = useUserStore((state) => state.currentUser)
  const scrollBottomRef = useRef<HTMLDivElement>(null)

  const [limitCount, setLimitCount] = useState(10)

  const { data, loading, error } = useCollectionQuery(
    `conversation-data-${conversationId}-${limitCount}`,
    query(
      collection(
        firebaseDb,
        'conversations',
        conversationId as string,
        'message'
      ),
      orderBy('createdAt'),
      limitToLast(limitCount)
    )
  )

  const dataRef = useRef(data)
  const conversationIdRef = useRef(conversationId)
  const isWindowFocus = useRef(true)

  const updateSeenStatus = () => {
    if (dataRef.current?.empty) return

    const lastDoc = dataRef.current?.docs?.slice(-1)?.[0]

    if (!lastDoc) return

    updateDoc(
      doc(firebaseDb, 'conversations', conversationIdRef.current as string),
      {
        [`seen.${currentUser?.uid}`]: lastDoc.id,
      }
    )
  }

  useEffect(() => {
    dataRef.current = data
  }, [data])

  useEffect(() => {
    conversationIdRef.current = conversationId
  }, [conversationId])

  useEffect(() => {
    if (isWindowFocus.current) updateSeenStatus()
    scrollBottomRef.current?.scrollIntoView()
    setTimeout(() => {
      scrollBottomRef.current?.scrollIntoView()
    }, 100)
  }, [data?.docs?.slice(-1)?.[0]?.id || ''])

  useEffect(() => {
    const focusHandler = () => {
      isWindowFocus.current = true
      updateSeenStatus()
    }

    const blurHandler = () => {
      isWindowFocus.current = false
    }
    addEventListener('focus', focusHandler)
    addEventListener('blur', blurHandler)

    return () => {
      removeEventListener('focus', focusHandler)
      removeEventListener('blur', blurHandler)
    }
  }, [])

  return (
    <div
      style={{ height: `calc(100vh - ${144 + inputSectionOffset}px)` }}
    ></div>
  )
}
