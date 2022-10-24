import type { ConversationInfo, SavedUser } from '../../..//library'

import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { useState } from 'react'
import { FiUserCheck, FiUserX } from 'react-icons/fi'
import { useNavigate, useParams } from 'react-router-dom'

import { firebaseDb, IMAGE_PROXY, useUserStore } from '../../..//library'
import { useUsersInfo } from '../../../hooks'
import { Alerts } from '../../Alert/Alert'
import { MiniSpinner } from '../../MiniSpinner/MiniSpinner'

type MembersProps = {
  conversation: ConversationInfo
}

export const Members = ({ conversation }: MembersProps) => {
  const { id: conversationId } = useParams()

  const currentUser = useUserStore((state) => state.currentUser)

  const { data, loading, error } = useUsersInfo(conversation.users)

  const navigate = useNavigate()

  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [alertText, setAlertText] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleRemoveFromGroup = (uid: string) => {
    if (
      conversation.group?.admins.length === 1 &&
      conversation.group.admins[0] === uid
    ) {
      setAlertText('You must set another one to be an admin')
      setIsAlertOpen(true)
    } else {
      updateDoc(doc(firebaseDb, 'conversations', conversationId as string), {
        users: arrayRemove(uid),
        'group.admins': arrayRemove(uid),
        'group.groupImage': conversation.group?.groupImage,
        'group.groupName': conversation.group?.groupName,
      })

      if (currentUser?.uid === uid) {
        navigate('/')
      }
    }
  }

  const handleMakeAdmin = (uid: string) => {
    updateDoc(doc(firebaseDb, 'conversations', conversationId as string), {
      'group.admins': arrayUnion(uid),
      'group.groupImage': conversation.group?.groupImage,
      'group.groupName': conversation.group?.groupName,
    })
    setIsAlertOpen(true)
    setAlertText('Done making an admin')
  }

  if (loading || error)
    return (
      <div>
        <MiniSpinner />
      </div>
    )

  return (
    <>
      <div>
        {data
          ?.map((item) => item.data() as SavedUser)
          .map((user) => (
            <div key={user.uid}>
              <div>
                <img src={IMAGE_PROXY(user.photoURL)} alt="" />
                <h1>{user.displayName}</h1>
              </div>

              {conversation.group?.admins?.includes(
                currentUser?.uid as string
              ) && (
                <div tabIndex={0}>
                  <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    ellipsis{' '}
                  </button>

                  {isMenuOpen && (
                    <div>
                      {conversation.users.length > 3 && (
                        <button onClick={() => handleRemoveFromGroup(user.uid)}>
                          <FiUserX />{' '}
                          <>
                            {user.uid === currentUser?.uid
                              ? 'Leave group'
                              : 'Kick from group'}
                          </>
                        </button>
                      )}
                      {user.uid !== currentUser?.uid && (
                        <button onClick={() => handleMakeAdmin(user.uid)}>
                          <FiUserCheck /> Make an admin
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
      </div>

      <Alerts
        text={alertText}
        isOpen={isAlertOpen}
        setIsOpen={setIsAlertOpen}
      />
    </>
  )
}
