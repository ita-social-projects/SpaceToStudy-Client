import { useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import GoogleLogin from '~/containers/guest-home-page/google-login/GoogleLogin'
import useForm from '~/hooks/use-form'
import useConfirm from '~/hooks/use-confirm'
import usePrompt from '~/hooks/use-prompt'
import { firstName, lastName,  confirmPassword } from '~/constants/validation/signup'
import { email, password } from '~/constants/validation/login'
import { constants } from '~/constants/common'
import SignupForm from '~/containers/guest-home-page/signup-form/SignupForm'

import style from '~/containers/guest-home-page/signup-dialog/signup-dialog.style'

const SignupDialog = ({ type }) => {
  const { t } = useTranslation()
  const { setNeedConfirmation } = useConfirm()
  const { setPrompt } = usePrompt()

  const { handleSubmit, handleChange, handleBlur, data, isDirty, errors } = useForm(
    {
      onSubmit: () => console.log({ data, isDirty }),
      initialValues: { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' },
      validations: { firstName, lastName, email, password, confirmPassword }
    }
  )

  useEffect(() => {
    setNeedConfirmation(isDirty)
    setPrompt(isDirty)
  }, [isDirty, setNeedConfirmation, setPrompt])

  return (
    <Box sx={ style.root }>
      
      <Box sx={ style.img }>
        <Box
          alt="signup" component='img' src={ require(`../../../assets/img/signup-dialog/${type}.svg`).default }
          sx={ style.img }
        />
      </Box>
      
      <Box sx={ style.form }>
        <Box component='hr' sx={ style.hr } />
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

        <GoogleLogin type={ constants.signup } />
      </Box>
    </Box>
  )
}

export default SignupDialog
