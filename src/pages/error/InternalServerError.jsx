import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import AppButton from '~/components/app-button/AppButton'

import { guestRoutes } from '~/router/constants/guestRoutes'
import { styles } from '~/pages/error/styles/InternalServerError.styles'
import backGround500 from '~/assets/img/error-page/500.svg'
import { ButtonVariantEnum } from '~/types'

const InternalServerError = () => {
  const { t } = useTranslation()

  return (
    <Box sx={styles.container}>
      <Box sx={styles.wrapper}>
        <Box sx={styles.leftBlock}>
          <Typography sx={styles.title} variant={'h2'}>
            {t('errorPage.500.title')}
          </Typography>
          <Typography sx={styles.description} variant={'subtitle1'}>
            {t('errorPage.500.description')}
          </Typography>
          <AppButton
            component={Link}
            sx={styles.homeBtn}
            to={guestRoutes.home.path}
            variant={ButtonVariantEnum.Contained}
          >
            {t('button.toMain')}
          </AppButton>
        </Box>
        <Box
          alt='errorLogo'
          component='img'
          src={backGround500}
          sx={styles.image}
        ></Box>
      </Box>
    </Box>
  )
}

export default InternalServerError
