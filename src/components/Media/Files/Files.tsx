import { collection, orderBy, where, query } from 'firebase/firestore'
import { BsDownload } from 'react-icons/bs'
import { useParams } from 'react-router-dom'

import { useCollectionQuery } from '../../../hooks'
import { firebaseDb, formatFileSize } from '../../../library'
import { MiniSpinner } from '../../MiniSpinner/MiniSpinner'
import FileIcon from './FileIcon'

export function Files() {
  const { id: conversationId } = useParams()

  const { data, loading, error } = useCollectionQuery(
    `files-${conversationId}`,
    query(
      collection(
        firebaseDb,
        'conversations',
        conversationId as string,
        'messages'
      ),
      where('type', '==', 'file'),
      orderBy('createdAt', 'desc')
    )
  )

  if (loading || error)
    return (
      <div className="flex h-80 items-center justify-center">
        <MiniSpinner />
      </div>
    )

  if (data?.empty)
    return (
      <div className="h-80 py-3">
        <p className="text-center">No file found</p>
      </div>
    )

  return (
    <div>
      {data?.docs.map((file) => (
        <div key={file.id}>
          <FileIcon extension={file.data().file.name.split('.').slice(-1)[0]} />
          <div>
            <h1>{file.data()?.file?.name}</h1>
            <p>{formatFileSize(file.data()?.file?.size)}</p>
          </div>
          <a
            href={file.data().content}
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsDownload />
          </a>
        </div>
      ))}
    </div>
  )
}
