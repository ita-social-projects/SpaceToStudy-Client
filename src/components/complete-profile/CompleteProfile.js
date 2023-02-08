import { useTranslation } from 'react-i18next'
import { Accordion, AccordionDetails, AccordionSummary, Box, IconButton, Typography } from '@mui/material'
import AppProgressBar from '../app-progress-bar-line/AppProgressBarLine.js'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import { styles } from './CompleteProfile.styles.js'
import { useMemo, useState } from 'react'
import ProfileItem from '../profile-item/ProfileItem.js'
import { Link, useLocation } from 'react-router-dom'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

const CompleteProfile = ({ profileItems, data, expanded = false }) => {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const [isOpen, setIsOpen] = useState(expanded)

  const isMyProfile = pathname.includes('myProfile')
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

  const icon = isMyProfile ? (
    <IconButton data-testid='showOrHide' onClick={ handleClick } sx={ { padding: '0px' } }>
      { isOpen ? <ExpandLessIcon data-testid='icon-less' /> : <ExpandMoreIcon data-testid='icon-more' /> }
    </IconButton>
  ) : (
    <Link to={ `${pathname}/myProfile` }>
      <ArrowForwardIcon color='secondary' />
    </Link>
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
