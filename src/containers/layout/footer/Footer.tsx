import Box from '@mui/material/Box'

import { useAppSelector } from '~/hooks/use-redux'
import FooterByRole from './footer-by-role/FooterByRole'
import GuestFooter from './guest-footer/GuestFooter'

import { styles } from '~/containers/layout/footer/Footer.styles'

const Footer = () => {
  const { userRole } = useAppSelector((state) => state.appMain)

  return (
    <Box component={'footer'} sx={styles.footer}>
      {userRole ? <FooterByRole userRole={userRole} /> : <GuestFooter />}
    </Box>
  )
}

export default Footer
