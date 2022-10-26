/* eslint-disable @typescript-eslint/no-unused-vars */
import type { MessageItem } from '../../../library'

import { useState } from 'react'
import { FiX } from 'react-icons/fi'

import { useUsersInfo } from '../../../hooks'
import { IMAGE_PROXY } from '../../../library'
import { REACTIONS_UI } from '../../../library'
import { MiniSpinner } from '../../MiniSpinner/MiniSpinner'

type ReactionStatusProps = {
  position: 'left' | 'right' | 'left-tab'
  message: MessageItem
}

export function ReactionStatus({ message, position }: ReactionStatusProps) {
  const {
    data: usersInfo,
    loading,
    error,
  } = useUsersInfo(Object.keys(message.reactions || {}))

  const [isReactionStatusOpened, setIsReactionStatusOpened] = useState(false)

  return (
    <>
      <div
        onClick={() => setIsReactionStatusOpened(true)}
        className={
          position === 'right'
            ? 'right-8'
            : position === 'left-tab'
            ? 'left-[70px]'
            : 'left-8'
        }
      >
        {Object.entries(
          Object.entries(message.reactions).reduce((acc, [key, value]) => {
            if (value) acc[value] = (acc[value] || 0) + 1
            return acc
          }, {} as { [key: number]: number })
        )
          .sort(([key1, value1], [key2, value2]) => value1 - value2)
          .slice(0, 3)
          .map(([key, value]) => (
            <img
              key={key}
              className="h-3 w-3"
              src={Object.entries(REACTIONS_UI)[Number(key) - 1][1].icon}
              alt=""
            />
          ))}

        <span>
          {
            Object.entries(message.reactions).filter(([key, value]) => value)
              .length
          }
        </span>
      </div>

      {isReactionStatusOpened && (
        <div onClick={() => setIsReactionStatusOpened(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <div>
              <h1>Reactions</h1>

              <button onClick={() => setIsReactionStatusOpened(false)}>
                <FiX />
              </button>
            </div>

            {loading || error ? (
              <MiniSpinner />
            ) : (
              <div>
                {Object.entries(message.reactions)
                  .filter(([key, value]) => value)
                  .map(([key, value]) => (
                    <div key={key}>
                      <div>
                        <img
                          src={IMAGE_PROXY(
                            usersInfo?.find((user) => user.id === key)?.data()
                              ?.photoURL
                          )}
                          alt=""
                        />
                        <p>
                          {
                            usersInfo?.find((user) => user.id === key)?.data()
                              ?.displayName
                          }
                        </p>
                      </div>

                      <img
                        src={Object.values(REACTIONS_UI)[value - 1].icon}
                        alt=""
                      />
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
