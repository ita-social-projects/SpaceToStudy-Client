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

const GoogleButton = ({ role, route, buttonWidth, type }) => {
  const ref = useHref(route)
  const { closeModal } = useModalContext()
  const dispatch = useAppDispatch()
  const [googleAuth] = useGoogleAuthMutation()

  const handleCredentialResponse = useCallback(
    async (token) => {
      try {
        await googleAuth({ token, role }).unwrap()
        closeModal()
      } catch (e) {
        dispatch(
          openAlert({
            severity: snackbarVariants.error,
            message: getErrorKey(e.data)
          })
        )
        if (e.data.code === 'USER_NOT_FOUND') {
          closeModal()
          scrollToHash(ref)
        }
      }
    },
    [googleAuth, role, closeModal, dispatch, ref]
  )

  useEffect(() => {
    const googleId = window.google.accounts.id

    googleId.initialize({
      client_id: import.meta.env.VITE_GMAIL_CLIENT_ID,
      callback: handleCredentialResponse
    })

    googleId.renderButton(document.getElementById('googleButton'), {
      size: 'large',
      width: buttonWidth,
      locale: 'en',
      text: `${type}_with`
    })
  }, [handleCredentialResponse, buttonWidth, type])

  return <div id='googleButton' style={styles.google} />
}

export default GoogleButton
