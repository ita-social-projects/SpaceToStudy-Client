import Box from '@mui/material/Box'

import { useAppSelector } from '~/hooks/use-redux'
import FooterByRole from '~/containers/layout/footer/footer-by-role/FooterByRole'
import GuestFooter from '~/containers/layout/footer/guest-footer/GuestFooter'

import { styles } from '~/containers/layout/footer/Footer.styles'
import { ComponentEnum } from '~/types'

const Footer = () => {
  const { userRole } = useAppSelector((state) => state.appMain)

  return (
    <Box component={ComponentEnum.Footer} sx={styles.footer}>
      {userRole ? <FooterByRole userRole={userRole} /> : <GuestFooter />}
    </Box>
  )
}

export default Footer
