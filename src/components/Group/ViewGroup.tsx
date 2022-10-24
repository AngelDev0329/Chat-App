import type { ConversationInfo } from '../../library'

import { Dialog } from '@mui/material'
import { useState } from 'react'
import { FiX } from 'react-icons/fi'

import { AddMembers } from './AddMembers'
import { Admin } from './Admin'
import { Members } from './Members'

type ViewGroupProps = {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  conversation: ConversationInfo
}

export function ViewGroup({ isOpen, setIsOpen, conversation }: ViewGroupProps) {
  enum Sections {
    members,
    admins,
    addMembers,
  }
  const [selectedSection, setSelectedSection] = useState(Sections.members)
  const handleClose = () => {
    setIsOpen(false)
  }
  return (
    <Dialog onClose={handleClose} open={isOpen}>
      <div onClick={(event) => event.stopPropagation()}>
        <div>
          <h1>Group Members</h1>
          <button onClick={() => setIsOpen(false)}>
            <FiX />
          </button>
        </div>

        <div>
          <button
            onClick={() => setSelectedSection(Sections.members)}
            className={
              selectedSection === Sections.members ? 'bg-dark-lighten' : ''
            }
          >
            Members
          </button>
          <button
            onClick={() => setSelectedSection(Sections.admins)}
            className={
              selectedSection === Sections.admins ? 'bg-dark-lighten' : ''
            }
          >
            Admins
          </button>
          <button
            onClick={() => setSelectedSection(Sections.addMembers)}
            className={
              selectedSection === Sections.addMembers ? 'bg-dark-lighten' : ''
            }
          >
            Add members
          </button>
        </div>
        {selectedSection === Sections.members ? (
          <Members conversation={conversation} />
        ) : selectedSection === Sections.admins ? (
          <Admin conversation={conversation} />
        ) : selectedSection === Sections.addMembers ? (
          <AddMembers conversations={conversation} />
        ) : (
          <></>
        )}
      </div>
    </Dialog>
  )
}
