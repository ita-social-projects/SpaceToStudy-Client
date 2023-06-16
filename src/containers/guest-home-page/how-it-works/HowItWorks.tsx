import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import CardsWithButton from '~/containers/guest-home-page/cards-with-button/CardsWithButton'
import AppContentSwitcher from '~/components/app-content-switcher/AppContentSwitcher'
import {
  tutorCardBoxArray,
  studentCardBoxArray
} from '~/containers/guest-home-page/how-it-works/CardBoxArrays'
import { guestRoutes } from '~/router/constants/guestRoutes'

import { TypographyVariantEnum, UserRoleEnum } from '~/types'
import { styles } from '~/containers/guest-home-page/how-it-works/HowItWorks.styles'

const HowItWorks = () => {
  const { t } = useTranslation()

  const [isStudent, setIsStudent] = useState(false)

  const onChange = () => {
    setIsStudent(!isStudent)
  }

  const switchOptions = {
    left: {
      text: t('guestHomePage.howItWorks.learnFromExperts')
    },
    right: {
      text: t('guestHomePage.howItWorks.shareYourExperience')
    }
  }

  return (
    <Box id={guestRoutes.navBar.howItWorks.route}>
      <Box sx={styles.container}>
        <Typography sx={styles.title}>
          {t('guestHomePage.howItWorks.title')}
        </Typography>
        <AppContentSwitcher
          active={isStudent}
          onChange={onChange}
          styles={styles.switch}
          switchOptions={switchOptions}
          typographyVariant={TypographyVariantEnum.H6}
        />
        <CardsWithButton
          array={isStudent ? tutorCardBoxArray : studentCardBoxArray}
          btnText={
            isStudent
              ? t('guestHomePage.whatCanYouDo.learn.actionLabel')
              : t('guestHomePage.whatCanYouDo.teach.actionLabel')
          }
          isStudent={isStudent}
          role={isStudent ? UserRoleEnum.Tutor : UserRoleEnum.Student}
        />
      </Box>
    </Box>
  )
}

export default HowItWorks
