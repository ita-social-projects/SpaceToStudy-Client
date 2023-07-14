import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import AppContentSwitcher from '~/components/app-content-switcher/AppContentSwitcher'
import CardsWithButton from '~/containers/guest-home-page/cards-with-button/CardsWithButton'
import {
  studentCardBoxArray,
  tutorCardBoxArray
} from '~/containers/guest-home-page/how-it-works/CardBoxArrays'
import { guestRoutes } from '~/router/constants/guestRoutes'

import { student, tutor } from '~/constants'
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
          typographyVariant={'h6'}
        />
        <CardsWithButton
          array={isStudent ? tutorCardBoxArray : studentCardBoxArray}
          btnText={
            isStudent
              ? t('guestHomePage.whatCanYouDo.learn.actionLabel')
              : t('guestHomePage.whatCanYouDo.teach.actionLabel')
          }
          isStudent={isStudent}
          role={isStudent ? tutor : student}
        />
      </Box>
    </Box>
  )
}

export default HowItWorks
