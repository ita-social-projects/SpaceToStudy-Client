import { AppBar, Toolbar } from '@mui/material'
import NavBar from '~/containers/navbar/NavBar'
import { mainShadow } from '~/styles/app-theme/custom-shadows'

const AppHeader = () => {

  return (
    <>
      <AppBar color='common' sx={ { boxShadow: mainShadow } }>
        <NavBar />
      </AppBar>
      <Toolbar data-testid='toolbar' sx={ { height: { xs: '56px', sm: '72px', md: '80px' } } } />
    </>
  )
}

export default AppHeader
