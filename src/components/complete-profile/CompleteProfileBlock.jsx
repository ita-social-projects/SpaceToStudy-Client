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

import AppProgressBar from '~/components/app-progress-bar-line/AppProgressBarLine.jsx'
import ProfileItem from '~/components/profile-item/ProfileItem.jsx'
import { styles } from '~/components/complete-profile/CompleteProfileBlock.styles.js'
import { studentRoutes } from '~/router/constants/studentRoutes'
import { guestRoutes } from '~/router/constants/guestRoutes'
import useBreakpoints from '~/hooks/use-breakpoints'

const CompleteProfileBlock = ({ profileItems, data }) => {
  const { t } = useTranslation()
  const { isMobile } = useBreakpoints()
  const { userRole } = useSelector((state) => state.appMain)
  const homePage = useMatch(guestRoutes[userRole].path)
  const linkToProfile = studentRoutes.accountMenu.myProfile.route
  const [isOpen, setIsOpen] = useState(false)

  const checkProfileData = useMemo(
    () => profileItems.filter((item) => data[item.id]),
    [data, profileItems]
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
        />
      )),
    [profileItems, checkProfileData]
  )

  const handleToggleMenu = () => {
    setIsOpen((prev) => !prev)
  }

  const icon = homePage ? (
    <Link to={linkToProfile}>
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
            <Typography sx={styles.title} variant={isMobile ? 'button' : 'h5'}>
              {t('completeProfile.title')}
            </Typography>
            <Typography
              color={'primary.500'}
              sx={styles.subtitle}
              variant={isMobile ? 'body2' : 'subtitle2'}
            >
              {t('completeProfile.subtitle')}
            </Typography>
          </Box>
          {icon}
        </Box>
        <AppProgressBar value={valueProgressBar} />
      </AccordionSummary>
      <AccordionDetails sx={styles.profileItems}>
        {profileList}
      </AccordionDetails>
    </Accordion>
  )
}

export default CompleteProfileBlock
