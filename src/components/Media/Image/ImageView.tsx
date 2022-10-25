import { FiX } from 'react-icons/fi'

interface ImageViewProps {
  src: string
  isOpened: boolean
  setIsOpened: (value: boolean) => void
}

const ImageView = ({ src, isOpened, setIsOpened }: ImageViewProps) => {
  return (
    <div
      onClick={() => setIsOpened(false)}
      className={`fixed top-0 left-0 z-20 flex h-full w-full items-center justify-center bg-[#00000080] transition-all duration-300 ${
        isOpened ? 'visible opacity-100' : 'invisible opacity-0'
      }`}
    >
      {src && <img onClick={(e) => e.stopPropagation()} src={src} />}

      <button onClick={() => setIsOpened(false)}>
        <FiX />
      </button>
    </div>
  )
}

export default ImageView
