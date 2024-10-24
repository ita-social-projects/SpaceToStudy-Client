import { FC, useMemo, useState, useCallback, useEffect } from 'react'
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
import { UserResponse, UserRole, VideoUserRole } from '~/types'
import { styles } from '~/components/complete-profile/CompleteProfileBlock.styles'
import useAxios from '~/hooks/use-axios'
import { OfferService } from '~/services/offer-service'
import { defaultResponse } from '~/pages/my-offers/MyOffers.constants'
import { useDrawer } from '~/hooks/use-drawer'
import AppDrawer from '~/components/app-drawer/AppDrawer'
import CreateOffer from '~/containers/offer-page/create-offer/CreateOffer'

interface CompleteProfileBlockProps {
  profileItems: ProfileItemType[]
  data: UserResponse
  openAccordion?: boolean
}

const CompleteProfileBlock: FC<CompleteProfileBlockProps> = ({
  data,
  profileItems,
  openAccordion = false
}) => {
  const { t } = useTranslation()
  const { isMobile } = useBreakpoints()
  const { userRole, userId } = useAppSelector((state) => state.appMain)
  const homePage = useMatch(guestRoutes[userRole as UserRole].path)
  const [isOpen, setIsOpen] = useState(false)

  const { openDrawer, closeDrawer, isOpen: isDrawerOpen } = useDrawer()
  const [isOfferCreated, setIsOfferCreated] = useState(false)

  useEffect(() => {
    if (openAccordion) {
      setIsOpen(true)
    }
  }, [openAccordion])

  const getMyOffers = useCallback(
    () =>
      OfferService.getUsersOffers({
        id: userId
      }),
    [userId]
  )

  const { response, fetchData } = useAxios({
    service: getMyOffers,
    defaultResponse
  })

  useEffect(() => {
    if (isOfferCreated) {
      void fetchData()
    }
  }, [isOfferCreated, fetchData])

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
            return data.videoLink?.[userRole as VideoUserRole]
          case 'offer':
            return response.items.length
          default:
            return data[item.id as keyof UserResponse]
        }
      }),
    [data, profileItems, response, userRole]
  )

  const valueProgressBar = Math.floor(
    (checkProfileData.length / profileItems.length) * 100
  )

  const profileList = useMemo(
    () =>
      profileItems.map((item) => (
        <ProfileItem
          handleOpenDrawer={openDrawer}
          isFilled={checkProfileData.includes(item)}
          item={item}
          key={item.id}
          userRole={userRole}
        />
      )),
    [profileItems, checkProfileData, userRole, openDrawer]
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
    <Accordion expanded={isOpen} id='complete' sx={styles.wrapper}>
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
        <AppDrawer onClose={closeDrawer} open={isDrawerOpen}>
          <CreateOffer
            closeDrawer={closeDrawer}
            updateOffer={setIsOfferCreated}
          />
        </AppDrawer>
      </AccordionDetails>
    </Accordion>
  )
}

export default CompleteProfileBlock
