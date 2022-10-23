import type { AuthProvider } from 'firebase/auth'

import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useState } from 'react'
import { BsGoogle } from 'react-icons/bs'
import { Navigate } from 'react-router-dom'

import { Alerts, Github } from '../../components'
import { useQueryParams } from '../../hooks'
import { firebaseAuth, useUserStore } from '../../library'

import './style.css'

export function SignIn() {
  const { redirect } = useQueryParams()

  const currentUser = useUserStore((state) => state.currentUser)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isAlertOpen, setIsAlertOpen] = useState(false)

  const handleSignIn = (provider: AuthProvider) => {
    setLoading(true)

    signInWithPopup(firebaseAuth, provider)
      .then((res) => {
        console.log(res.user)
      })
      .catch((err) => {
        setIsAlertOpen(true)
        setError(`Error: ${err.code}`)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  if (currentUser) return <Navigate to={redirect || '/'} />

  return (
    <>
      <Github />
      <div className="container">
        <div className="gif">
          <img
            src="https://cdn.dribbble.com/users/180609/screenshots/2265644/media/3c7c4ac4bebec0c6564f0bd1cf2f3039.gif"
            alt=""
          />
        </div>
        <div className="wrapper">
          <h1>The best place for messaging</h1>
          <p>
            It's free, fast and secure. We make it easy and fun to stay close to
            your favourite people.
          </p>

          <button
            disabled={loading}
            onClick={() => handleSignIn(new GoogleAuthProvider())}
          >
            <BsGoogle className="svg" aria-label="Sign In With Google" />
            Sign In With Google
          </button>
        </div>
        <Alerts isOpen={isAlertOpen} setIsOpen={setIsAlertOpen} text={error} />
      </div>
    </>
  )
}
