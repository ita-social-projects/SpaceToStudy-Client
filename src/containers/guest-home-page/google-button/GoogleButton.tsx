import { useCallback, useEffect } from 'react'
import { useHref } from 'react-router-dom'

import { useGoogleAuthMutation } from '~/services/auth-service'
import { useModalContext } from '~/context/modal-context'
import { useAppDispatch } from '~/hooks/use-redux'
import { scrollToHash } from '~/utils/hash-scroll'

import { snackbarVariants } from '~/constants'
import { styles } from '~/containers/guest-home-page/google-button/GoogleButton.styles'
import { openAlert } from '~/redux/features/snackbarSlice'
import { getErrorKey } from '~/utils/get-error-key'
import { UserRole } from '~/types'

interface GoogleAuth {
  initialize: (config: {
    client_id: string
    callback: (token: string) => void
  }) => void
  renderButton: (
    container: HTMLElement,
    options: { size: string; width: string; locale: string; text: string }
  ) => void
}

declare global {
  interface Window {
    google: {
      accounts: {
        id: GoogleAuth
      }
    }
  }
}

interface GoogleButtonProps {
  role: UserRole
  route: string
  buttonWidth: string
  type: string
}

interface GoogleId {
  initialize: (config: {
    client_id: string
    callback: (token: string) => void
  }) => void
  renderButton: (
    container: HTMLElement,
    options: { size: string; width: string; locale: string; text: string }
  ) => void
}

const GoogleButton: React.FC<GoogleButtonProps> = ({
  role,
  route,
  buttonWidth,
  type
}) => {
  const ref = useHref(route)
  const { closeModal } = useModalContext()
  const dispatch = useAppDispatch()
  const [googleAuth] = useGoogleAuthMutation()

  const handleCredentialResponse = useCallback(
    async (token: string) => {
      try {
        await googleAuth({ token, role }).unwrap()
        closeModal()
      } catch (e) {
        const error = e as { data: { code: string } }
        dispatch(
          openAlert({
            severity: snackbarVariants.error,
            message: getErrorKey(error.data)
          })
        )
        if (error.data.code === 'USER_NOT_FOUND') {
          closeModal()
          scrollToHash(ref)
        }
      }
    },
    [googleAuth, role, closeModal, dispatch, ref]
  )

  useEffect(() => {
    const googleId = window.google.accounts.id as GoogleId

    googleId.initialize({
      client_id: import.meta.env.VITE_GMAIL_CLIENT_ID,
      callback: (token: string) => {
        handleCredentialResponse(token).catch((error) => {
          console.error('Error handling credential response:', error)
        })
      }
    })

    googleId.renderButton(
      document.getElementById('googleButton') as HTMLElement,
      {
        size: 'large',
        width: buttonWidth,
        locale: 'en',
        text: `${type}_with`
      }
    )
  }, [handleCredentialResponse, buttonWidth, type])

  return <div id='googleButton' style={styles.google} />
}

export default GoogleButton
