import { useContext, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

import useForm from '~/hooks/use-form'
import useConfirm from '~/hooks/use-confirm'
import { ModalContext } from '~/context/modal-context'
import { SnackBarContext } from '~/context/snackbar-context'

import { firstName, lastName, confirmPassword, email, password } from '~/utils/validations/login'
import { signup, snackbarVariants } from '~/constants'
import GoogleLogin from '~/containers/guest-home-page/google-login/GoogleLogin'
import SignupForm from '~/containers/guest-home-page/signup-form/SignupForm'
import ImgTitleDescription from '~/components/img-title-description/ImgTitleDescription'
import { signupUser } from '~/redux/reducer'

import student from '~/assets/img/signup-dialog/student.png'
import mentor from '~/assets/img/signup-dialog/mentor.png'
import info from '~/assets/img/guest-home-page/info.svg'

import { style } from '~/containers/guest-home-page/signup-dialog/SignupDialog.style'

const SignupDialog = ({ type }) => {
  const { t } = useTranslation()
  const { setNeedConfirmation } = useConfirm()
  const { setModal, closeModal } = useContext(ModalContext)
  const { setAlert } = useContext(SnackBarContext)
  const dispatch = useDispatch()

  const signupImg = { student, mentor }

  const { handleSubmit, handleChange, handleBlur, data, isDirty, errors } = useForm({
    onSubmit: async () => {
      try {
        await dispatch(signupUser({ ...data, role: type })).unwrap()
        setModal(<ImgTitleDescription description={ description } img={ info } title={ t('signup.confirmEmailTitle') } />)
        setTimeout(() => closeModal(), 5000)
      } catch (e) {
        setAlert({
          severity: snackbarVariants.error,
          message: `errors.${e}`
        })
      }
    },
    initialValues: { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' },
    validations: { firstName, lastName, email, password, confirmPassword }
  })

  const description = (
    <>
      { t('signup.confirmEmailMessage') }
      <Typography component='span' variant='subtitle2'>
        { data.email }
      </Typography>
      { t('signup.confirmEmailDesc') }
    </>
  )

  useEffect(() => {
    setNeedConfirmation(isDirty)
  }, [isDirty, setNeedConfirmation])

  return (
    <Box sx={ style.root }>
      <Box sx={ style.imgContainer }>
        <Box
          alt='signup' component='img' src={ signupImg[type] }
          sx={ style.img }
        />
      </Box>

      <Box sx={ style.formContainer }>
        <Typography sx={ style.title } variant='h2'>
          { t('signup.head', { returnObjects: true })[type] }
        </Typography>
        <Box sx={ style.form }>
          <SignupForm
            closeModal={ closeModal }
            data={ data }
            errors={ errors }
            handleBlur={ handleBlur }
            handleChange={ handleChange }
            handleSubmit={ handleSubmit }
          />
          <GoogleLogin type={ signup } />
        </Box>
      </Box>
    </Box>
  )
}

export default SignupDialog
