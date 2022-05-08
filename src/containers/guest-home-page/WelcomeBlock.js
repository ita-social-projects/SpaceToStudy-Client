import { useTranslation } from 'react-i18next'
import { Typography, Box } from '@mui/material'

import PrimaryButton from '~/containers/ui/buttons/PrimaryButton'
import palette from '~/styles/app-theme/app.pallete'
import welcomeBg from '~/img/guest-home-page/welcomeBlock.svg'
import pointer from '~/img/guest-home-page/pointer.svg'

const style = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '650px',
    backgroundImage: `url(${ welcomeBg })`,
    backgroundPosition: 'center'
  },
  title: {
    // border: '1px solid green',
    display: 'flex',
    alignItems: 'flex-end',
    mr: '-116px'
  },
  h1: {
    mt: '144px',
    mb: '24px',
    color: palette.primary[900],
    textAlign: 'center'
  },
  blue: {
    color: '#2B4680'
  },
  green: {
    color: '#3C835A',
    '&::after': {
      content: '""',
      ml: '7px',
      border: '1px solid #263238',
      boxShadow: ' 0px 4px 5px rgba(144, 164, 174, 0.25), 0px 7px 10px rgba(144, 164, 174,' +
        ' 0.14), 0px 2px 15px rgba(144, 164, 174, 0.11)'
    }
  },
  authorBox: {
    // border: '1px solid blue',
    display: 'flex',
    ml: '5px',
    pt: '12px',
    pl: '26px',
    backgroundImage: `url(${ pointer })`,
    backgroundRepeat: 'no-repeat'
  },
  authorName: {
    p: '4px 8px',
    color: '#fff',
    background: palette.primary[900],
    boxShadow: '0px 5px 6px -3px rgba(144, 164, 174, 0.2), 0px 9px 12px 1px rgba(144, 164, 174,' +
      ' 0.14), 0px 3px 16px 2px rgba(144, 164, 174, 0.12)',
    borderRadius: '4px'
  },
  subtitle: {
    mb: '32px',
    color: palette.primary[900],
    textAlign: 'center'
  },
  getStartBtn: {
    p: '16px 51px'
  }

}

const WelcomeBlock = () => {
  const { t } = useTranslation()

  return (
    <Box sx={ style.container } >
      <Box sx={ style.title } >
        <Typography sx={ style.h1 } variant={ 'h1' } >
          { t('guestHomePage.welcomeBlock.title.titlePart1') }
          <br />
          <Box component="span" sx={ style.blue } >
            { t('guestHomePage.welcomeBlock.title.titlePart2') }
          </Box >
          { t('guestHomePage.welcomeBlock.title.titlePart3') }
          <Box component="span" sx={ style.green } >
            { t('guestHomePage.welcomeBlock.title.titlePart4') }
          </Box >
        </Typography >

        <Box component="span" sx={ style.authorBox } >
          <Typography sx={ style.authorName } variant={ 'caption' } >
            { t('guestHomePage.welcomeBlock.author') }
          </Typography >
        </Box >
      </Box >

      <Typography sx={ style.subtitle } variant={ 'subtitle1' } >
        { t('guestHomePage.welcomeBlock.subtitle.subtitlePart1') }
        <br />
        { t('guestHomePage.welcomeBlock.subtitle.subtitlePart2') }
      </Typography >

      <PrimaryButton sx={ style.getStartBtn } text={ t('guestHomePage.welcomeBlock.btnText') } />
    </Box >
  )
}

export default WelcomeBlock
