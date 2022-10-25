import { useState } from 'react'
import { SiAdobeacrobatreader } from 'react-icons/si'

import { FILE_ICON } from '../../../library/constant'

type FileIconProps = {
  extension: string
  className?: string
}

const FileIcon = ({ extension, className }: FileIconProps) => {
  const [isError, setIsError] = useState(false)

  if (isError) return <SiAdobeacrobatreader />

  return (
    <img
      className={className || ''}
      onError={() => setIsError(true)}
      src={FILE_ICON(extension)}
    ></img>
  )
}

export default FileIcon
