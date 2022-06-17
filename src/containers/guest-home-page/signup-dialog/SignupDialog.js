import { useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import GoogleLogin from '~/containers/guest-home-page/google-login/GoogleLogin'
import useForm from '~/hooks/use-form'
import useConfirm from '~/hooks/use-confirm'
import { firstName, lastName, confirmPassword, email, password } from '~/constants/validation/login'
import { signup } from '~/containers/guest-home-page/constants'
import SignupForm from '~/containers/guest-home-page/signup-form/SignupForm'
import student from '~/assets/img/signup-dialog/student.png'
import mentor from '~/assets/img/signup-dialog/mentor.png'

import { style } from '~/containers/guest-home-page/signup-dialog/signup-dialog.style'

const SignupDialog = ({ type }) => {
  const { t } = useTranslation()
  const { setNeedConfirmation } = useConfirm()

  const signupImg = type === 'student' ? student : mentor

  const { handleSubmit, handleChange, handleBlur, data, isDirty, errors } = useForm(
    {
      onSubmit: () => console.log({ data, isDirty }),
      initialValues: { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' },
      validations: { firstName, lastName, email, password, confirmPassword }
    }
  )

  useEffect(() => {
    setNeedConfirmation(isDirty)
  }, [isDirty, setNeedConfirmation])

  return (
    <Box sx={ style.root }>
      
      <Box sx={ style.img }>
        <Box
          alt="signup" component='img' src={ signupImg }
          sx={ style.img }
        />
      </Box>
      
      <Box sx={ style.form }>
        <Box sx={ style.line } />
        <Typography sx={ style.h2 } variant="h2">
          { t( 'signup.head', { returnObjects: true })[type] }
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
