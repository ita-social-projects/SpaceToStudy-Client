import { FC, useMemo, useState, useCallback } from 'react'
import { Link, useMatch } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

import AppProgressBarLine from '~/components/app-progress-bar-line/AppProgressBarLine'
import ProfileItem from '~/components/profile-item/ProfileItem.jsx'
import useBreakpoints from '~/hooks/use-breakpoints'
import { authRoutes } from '~/router/constants/authRoutes'
import { guestRoutes } from '~/router/constants/guestRoutes'
import { ProfileItemType } from '../profile-item/complete-profile.constants'
import { useAppSelector } from '~/hooks/use-redux'
import { UserResponse, UserRole } from '~/types'
import { styles } from '~/components/complete-profile/CompleteProfileBlock.styles'
import useAxios from '~/hooks/use-axios'
import { OfferService } from '~/services/offer-service'
import { defaultResponse } from '~/pages/my-offers/MyOffers.constants'

interface CompleteProfileBlockProps {
  profileItems: ProfileItemType[]
  data: UserResponse
}

const CompleteProfileBlock: FC<CompleteProfileBlockProps> = ({
  data,
  profileItems
}) => {
  const { t } = useTranslation()
  const { isMobile } = useBreakpoints()
  const { userRole, userId } = useAppSelector((state) => state.appMain)
  const homePage = useMatch(guestRoutes[userRole as UserRole].path)
  const [isOpen, setIsOpen] = useState(false)

  const getMyOffers = useCallback(
    () =>
      OfferService.getUsersOffers({
        id: userId
      }),
    [userId]
  )

  const { response } = useAxios({
    service: getMyOffers,
    defaultResponse
  })

  const checkIfHasNonEmptyFields = (
    obj: Record<string, string | undefined>
  ): boolean => {
    for (const prop in obj) {
      if (obj[prop]) {
        return true
      }
    }
    return false
  }

  const checkProfileData = useMemo(
    () =>
      profileItems.filter((item) => {
        switch (item.id) {
          case 'category':
            return data.mainSubjects.student.length
          case 'education':
            return checkIfHasNonEmptyFields(data.professionalBlock!)
          case 'video':
            return data.videoLink
          case 'offer':
            return response.items.length
          default:
            return data[item.id as keyof UserResponse]
        }
      }),
    [data, profileItems, response]
  )

  const valueProgressBar = Math.floor(
    (checkProfileData.length / profileItems.length) * 100
  )

  const profileList = useMemo(
    () =>
      profileItems.map((item) => (
        <ProfileItem
          isFilled={checkProfileData.includes(item)}
          item={item}
          key={item.id}
          userRole={userRole}
        />
      )),
    [profileItems, checkProfileData, userRole]
  )

  const handleToggleMenu = () => {
    setIsOpen((prev) => !prev)
  }

  const icon = homePage ? (
    <Link to={authRoutes.myProfile.path}>
      <ArrowForwardIcon color='secondary' />
    </Link>
  ) : (
    <IconButton
      data-testid='showOrHide'
      onClick={handleToggleMenu}
      sx={{ padding: '0px' }}
    >
      {isOpen ? (
        <ExpandLessIcon data-testid='icon-less' />
      ) : (
        <ExpandMoreIcon data-testid='icon-more' />
      )}
    </IconButton>
  )

  return (
    <Accordion expanded={isOpen} sx={styles.wrapper}>
      <AccordionSummary>
        <Box sx={styles.headerProgressBar}>
          <Box>
            <Typography variant={isMobile ? 'button' : 'h5'}>
              {t('completeProfileTutor.title')}
            </Typography>
            <Typography
              color={'primary.500'}
              variant={isMobile ? 'body2' : 'subtitle2'}
            >
              {t('completeProfileTutor.subtitle')}
            </Typography>
          </Box>
          {icon}
        </Box>
        <AppProgressBarLine userRole={userRole} value={valueProgressBar} />
      </AccordionSummary>
      <AccordionDetails sx={styles.profileItems}>
        {profileList}
      </AccordionDetails>
    </Accordion>
  )
}

export default CompleteProfileBlock
