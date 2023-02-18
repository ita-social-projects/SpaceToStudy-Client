import { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded'
import SchoolIcon from '@mui/icons-material/School'
import DoneIcon from '@mui/icons-material/Done'
import MailOutlineIcon from '@mui/icons-material/MailOutline'

import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import AppChipList from '~/components/app-chips-list/AppChipList'
import IconWithTextList from '~/components/icon-with-text-list/IconWithTextList'

import useBreakpoints from '~/hooks/use-breakpoints'
import { SnackBarContext } from '~/context/snackbar-context'
import img from '~/assets/img/tutor-profile-page/avatar.png'
import { accountInfo, subjectChips, doneItems } from '~/containers/tutor-profile/main-info/MainInfo.constants'
import { styles } from '~/containers/tutor-profile/main-info/MainInfo.styles'
import { snackbarVariants } from '~/constants'

const MainInfo = () => {
  const { t } = useTranslation()
  const { isDesktop, isMobile } = useBreakpoints()
  const { pathname } = useLocation()
  const { setAlert } = useContext(SnackBarContext)

  const isMyProfile = pathname.includes('/myProfile')
  const defaultQuantity = isDesktop || isMobile ? 4 : 2

  console.log(pathname)

  const copyProfileLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setAlert({
      severity: snackbarVariants.success,
      message: 'tutorProfilePage.mainInfo.copyProfileLink',
      duration: 2000
    })
  }

  const editOrCopyIcon = isMyProfile ? (
    <EditOutlinedIcon color='primary' fontSize='small' />
  ) : (
    <ContentCopyRoundedIcon color='primary' fontSize='small' />
  )

  const nameAndIcon = (
    <Box sx={ styles.nameAndIconWrapper }>
      <TitleWithDescription
        description={ 'Senior lecturer at the Department of German Philology and Translation' }
        descriptionStyles={ styles.status }
        style={ { wrapper: { textAlign: 'left' } } }
        title={ 'Esther Howard' }
        titleStyles={ styles.name }
      />

      <IconButton
        data-testid='icon-btn'
        onClick={ copyProfileLink }
        size={ isMobile ? 'small' : 'large' }
        sx={ styles.iconBtn }
      >
        { editOrCopyIcon }
      </IconButton>
    </Box>
  )

  const accInfo = accountInfo.map((item) => (
    <TitleWithDescription
      description={ item.description }
      descriptionStyles={ { typography: 'overline' } }
      key={ item.description }
      style={ { wrapper: { textAlign: 'center' } } }
      title={ item.title }
      titleStyles={ { typography: { md: 'h5' } } }
    />
  ))

  return (
    <Box sx={ styles.container }>
      <Box sx={ styles.imgNameIconWrapper }>
        <Box sx={ styles.imgWrapper }>
          <Box component='img' src={ img } sx={ styles.img } />
        </Box>
        { isMobile && nameAndIcon }
      </Box>

      <Box sx={ styles.infoWrapper }>
        { !isMobile && nameAndIcon }

        <Box sx={ styles.chipsWrapper }>
          <AppChipList
            defaultQuantity={ 2 }
            icon={ <SchoolIcon fontSize='small' sx={ styles.schoolIcon } /> }
            items={ subjectChips }
          />
        </Box>

        <Box sx={ styles.accInfoWrapper }>
          { accInfo }
        </Box>

        <IconWithTextList
          defaultQuantity={ defaultQuantity }
          icon={ <DoneIcon color='success' fontSize={ isDesktop ? 'medium' : 'small' } /> }
          items={ doneItems }
        />

        { !isMyProfile && (
          <Box sx={ styles.buttonGroup }>
            <Button fullWidth size={ isDesktop ? 'extraLarge' : 'medium' } variant='containedLight'>
              { t('tutorProfilePage.mainInfo.bookLesson') }
            </Button>

            <Button
              fullWidth size={ isDesktop ? 'extraLarge' : 'medium' } sx={ { gap: 1 } }
              variant='contained'
            >
              { isDesktop && <MailOutlineIcon fontSize='small' /> }
              { t('tutorProfilePage.mainInfo.sendMessage') }
            </Button>
          </Box>
        ) }
      </Box>
    </Box>
  )
}

export default MainInfo
