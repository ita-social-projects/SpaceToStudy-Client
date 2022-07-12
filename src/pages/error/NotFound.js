import React from 'react'
import { Typography, Button, Container, Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { routes } from '~/constants/routes'
import guy from '~/assets/img/error-page/big-404.svg'
import plant from '~/assets/img/error-page/small-404.svg'
import { mainShadow } from '~/styles/app-theme/custom-shadows'

const style = {
  root: {
    maxHeight:'90vh'
  },
  container: {
    maxWidth: '1200px',
    m: 'auto',
    p: { xs: '0 20px 10px', sm: '0 57px 0', md: '0 69px 0' },
    display: 'grid',
    gridTemplateColumns: 'auto',
    gridTemplateRows:'auto',
    gridTemplateAreas: {      
      xs: `'box box'
      'button button'
      'guy plant'`,
      md: `'guy guy . .'
      'guy guy box box'
      'guy guy button plant'`,
    }
  },
  guy: {
    maxWidth: { xs: '260px',sm: '340px', md: '450px', lg: '500px' },
    gridArea: 'guy',
    overflow: 'auto'
  },
  plant: {
    justifySelf: 'end',
    alignSelf: 'end',
    maxWidth: { xs: '90px', md: '125px', lg: '200px' },
    gridArea: 'plant',
    overflow: 'auto',
  },
  box: {
    m: { xs: '30px auto 0',sm: '0 auto', md: 0 },
    gridArea: 'box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: { md: 'flex-start', xs: 'center' },
    maxWidth: { md: '488px', sm: '531px', xs: '343px' }
  },
  title: {
    lineHeight: { md: '61px', sm: '74px', xs: '51px' },
    fontSize: { md: '61px', sm: '45px', xs: '32px' },
    fontWeight: '300',
    color: 'primary.900',
    mb: '16px'
  },
  description: {
    textAlign: { md: 'start', xs: 'center' },
    typography:{
      sm:'subtitle1',
      xs:'subtitle2'
    },
    color: 'primary.900',
    mb: '40px'
  },
  button: {
    padding:'15px 50px',
    backgroundColor: 'primary.900',
    borderRaidus: '4px',
    boxShadow: mainShadow
  },
  buttonBox: {
    gridArea: 'button',
    m: { xs: '0 auto', md: 0 }
  }
}


const NotFound = () => {
  const { t } = useTranslation()

  return (
    <Box sx={ style.root }>
      <Container sx={ style.container }>
        
        <Box
          alt="errorLogo" component="img" src={ guy }
          sx={ style.guy }
        />
      
        <Box sx={ style.box }>
          <Typography sx={ style.title } variant={ 'h2' }>
            { t('errorPage.404.title') }
          </Typography>
          <Typography sx={ style.description } variant={ 'subtitle1' }>
            { t('errorPage.404.description') }
          </Typography>
        </Box>

        <Box sx={ style.buttonBox }>
          <Button
            component={ Link } size='large' sx={ style.button }
            to={ routes.home.route } variant="contained"
          >
            { t('button.toMain') }
          </Button>
        </Box>

        <Box sx={ style.plant }>
          <Box
            alt="errorLogo" component="img" src={ plant }
            sx={ style.plant }
          />
        </Box>

      </Container>
    </Box>
  )
}

export default NotFound
