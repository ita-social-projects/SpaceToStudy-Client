import { useContext, useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

import useForm from '~/hooks/use-form'
import useConfirm from '~/hooks/use-confirm'
import { ModalContext } from '~/context/modal-context'

import { firstName, lastName, confirmPassword, email, password } from '~/constants/validation/login'
import { signup } from '~/containers/guest-home-page/constants'
import GoogleLogin from '~/containers/guest-home-page/google-login/GoogleLogin'
import SignupForm from '~/containers/guest-home-page/signup-form/SignupForm'
import { signupUser } from '~/redux/reducer'

import student from '~/assets/img/signup-dialog/student.png'
import mentor from '~/assets/img/signup-dialog/mentor.png'

import { style } from '~/containers/guest-home-page/signup-dialog/signup-dialog.style'

const SignupDialog = ({ type }) => {
  const { t } = useTranslation()
  const { setNeedConfirmation } = useConfirm()
  const { closeModal } = useContext(ModalContext)
  const dispatch = useDispatch()

  const signupImg = { student, mentor }

  const { handleSubmit, handleChange, handleBlur, data, isDirty, errors } = useForm({
    onSubmit: async () => {
      try {
        await dispatch(signupUser({ ...data, role: type })).unwrap()
        closeModal()
      } catch (e) {
        console.log(e)
      }
    },
    initialValues: { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' },
    validations: { firstName, lastName, email, password, confirmPassword }
  })

  useEffect(() => {
    setNeedConfirmation(isDirty)
  }, [isDirty, setNeedConfirmation])

  return (
    <Box sx={ style.root }>
      <Box sx={ style.img }>
        <Box
          alt="signup"
          component="img"
          src={ signupImg[type] }
          sx={ style.img }
        />
      </Box>

      <Box sx={ style.form }>
        <Typography sx={ style.h2 } variant="h2">
          { t('signup.head', { returnObjects: true })[type] }
        </Typography>

        <SignupForm
          data={ data }
          errors={ errors }
          handleBlur={ handleBlur }
          handleChange={ handleChange }
          handleSubmit={ handleSubmit }
        />

        <GoogleLogin type={ signup } />
      </Box>
    </Box>
  )
}

export default SignupDialog
