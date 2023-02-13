import { useMemo, useState } from 'react'
import { Link, useMatch } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

import AppProgressBar from '~/components/app-progress-bar-line/AppProgressBarLine.js'
import ProfileItem from '~/components/profile-item/ProfileItem.js'
import { styles } from '~/components/complete-profile/CompleteProfile.styles.js'
import { tutorRoutes } from '~/router/constants/tutorRoutes.js'
import { studentRoutes } from '~/router/constants/studentRoutes.js'
import { guestRoutes } from '~/router/constants/guestRoutes'

const CompleteProfile = ({ profileItems, data }) => {
  const { t } = useTranslation()
  const { userRole } = useSelector((state) => state.appMain)
  const homePage = useMatch(guestRoutes[userRole].path)
  const linkToProfile =
    userRole === guestRoutes.student.path
      ? studentRoutes.accountMenu.myProfile.path
      : tutorRoutes.accountMenu.myProfile.path
  const [isOpen, setIsOpen] = useState(false)

  const checkProfileData = useMemo(() => profileItems.filter((item) => data[item.name]), [data, profileItems])
  const valueProgressBar = Math.floor((checkProfileData.length / profileItems.length) * 100)
  const profileList = useMemo(
    () =>
      profileItems.map((item) => (
        <ProfileItem isFilled={ checkProfileData.includes(item) } item={ item } key={ item.title } />
      )),
    [profileItems, checkProfileData]
  )

  const handleClick = () => {
    setIsOpen((prev) => !prev)
  }

  const icon = homePage ? (
    <Link to={ linkToProfile }>
      <ArrowForwardIcon color='secondary' />
    </Link>
  ) : (
    <IconButton data-testid='showOrHide' onClick={ handleClick } sx={ { padding: '0px' } }>
      { isOpen ? <ExpandLessIcon data-testid='icon-less' /> : <ExpandMoreIcon data-testid='icon-more' /> }
    </IconButton>
  )

  return (
    <Accordion expanded={ isOpen } sx={ styles.wrapper }>
      <AccordionSummary>
        <Box sx={ styles.headerProgressBar }>
          <Box>
            <Typography sx={ styles.title } variant='h5'>
              { t('tutorProfile.completeProfile.title') }
            </Typography>
            <Typography color={ 'primary.500' } sx={ styles.subtitle } variant='subtitle2'>
              { t('tutorProfile.completeProfile.subtitle') }
            </Typography>
          </Box>
          { icon }
        </Box>
        <AppProgressBar value={ valueProgressBar } />
      </AccordionSummary>
      <AccordionDetails sx={ styles.profileItems }>
        { profileList }
      </AccordionDetails>
    </Accordion>
  )
}

export default CompleteProfile
