import { updateDoc, doc } from 'firebase/firestore'
import { useParams } from 'react-router-dom'

import { firebaseDb, REACTIONS_UI, useUserStore } from '../../../library'

type ReactionPopupProps = {
  position: 'left' | 'right'
  setIsOpen: (value: boolean) => void
  messageId: string
  currentReaction: number
}

export function ReactionPopup({
  position,
  setIsOpen,
  messageId,
  currentReaction,
}: ReactionPopupProps) {
  const { id: conversationId } = useParams()

  const currentUser = useUserStore((state) => state.currentUser)

  const updateReaction = (value: number) => {
    updateDoc(
      doc(
        firebaseDb,
        'conversations',
        conversationId as string,
        'messages',
        messageId
      ),
      {
        [`reactions.${currentUser?.uid}`]: value,
      }
    )
  }

  return (
    <div className={position === 'left' ? 'left-8' : 'right-8'}>
      {Object.entries(REACTIONS_UI).map(([key, value], index) => (
        <div
          key={key}
          className={index + 1 === currentReaction ? 'current-reaction' : ''}
        >
          <img
            onClick={() => {
              if (index + 1 === currentReaction) updateReaction(0)
              else updateReaction(index + 1)
              setIsOpen(false)
            }}
            title={key}
            src={value.gif}
            alt=""
          />
        </div>
      ))}
    </div>
  )
}
