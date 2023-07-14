import Box from '@mui/material/Box'

import { useSelector } from 'react-redux'
import GuestFooter from '~/containers/layout/footer/guest-footer/GuestFooter'
import UserFooter from '~/containers/layout/footer/user-footer/UserFooter'

import { styles } from '~/containers/layout/footer/Footer.styles'

const Footer = () => {
  const { userRole, pageLoad } = useSelector((state) => state.appMain)

  return (
    <Box component={'footer'} sx={styles.footer}>
      {!pageLoad && (userRole ? <UserFooter /> : <GuestFooter />)}
    </Box>
  )
}

export default Footer
