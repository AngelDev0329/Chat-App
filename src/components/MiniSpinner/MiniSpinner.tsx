import { CgSpinner } from 'react-icons/cg'

import './style.css'

export const MiniSpinner = () => {
  return (
    <div role="alert" aria-label="loading" className="mini-spinner">
      <CgSpinner className="spin" />
    </div>
  )
}
