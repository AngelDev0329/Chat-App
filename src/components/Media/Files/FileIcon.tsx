import { useState } from 'react'
import { SiAdobeacrobatreader } from 'react-icons/si'

import { FILE_ICON } from '../../../library/constant'
import { FileImage } from '../style'

type FileIconProps = {
  extension: string
  className?: string
}

const FileIcon = ({ extension, className }: FileIconProps) => {
  const [isError, setIsError] = useState(false)

  if (isError) return <SiAdobeacrobatreader style={{ fontSize: '1rem' }} />

  return (
    <FileImage
      className={className || ''}
      onError={() => setIsError(true)}
      src={FILE_ICON(extension)}
    />
  )
}

export default FileIcon
