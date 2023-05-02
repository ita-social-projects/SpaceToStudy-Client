import { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import Divider from '@mui/material/Divider'
import Link from '@mui/material/Link'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import Logo from '~/containers/logo/Logo'
import HashLink from '~/components/hash-link/HashLink'
import useBreakpoints from '~/hooks/use-breakpoints'

import { UserRoleEnum } from '~/types'
import { tutorRoutes } from '~/router/constants/tutorRoutes'
import { studentRoutes } from '~/router/constants/studentRoutes'
import { guestRoutes } from '~/router/constants/guestRoutes'
import { styles } from '~/containers/layout/footer/footer-by-role/FooterByRole.styles'

interface FooterByRoleProps {
  userRole: UserRoleEnum
}

const FooterByRole: FC<FooterByRoleProps> = ({ userRole }) => {
  const { t } = useTranslation()
  const { isMobile } = useBreakpoints()
  const routes = useMemo(
    () =>
      userRole === UserRoleEnum.Tutor
        ? Object.values(tutorRoutes.navBar)
        : Object.values(studentRoutes.navBar),
    [userRole]
  )

  const links = routes.map((link) => (
    <Typography
      component={HashLink}
      key={link.path}
      sx={styles.link}
      to={link.path}
    >
      {t(`header.${link.route}`)}
    </Typography>
  ))

  const socialLinks = (
    <Box sx={styles.socialLinks}>
      <Link sx={styles.socialLink} target='_blank'>
        <FacebookIcon />
      </Link>
      <Link sx={styles.socialLink} target='_blank'>
        <InstagramIcon />
      </Link>
    </Box>
  )

  const logo = (
    <Link component={HashLink} to={guestRoutes.home.path}>
      <Logo light sx={styles.logo} />
    </Link>
  )

  return (
    <>
      <Container sx={styles.root}>
        {!isMobile && logo}
        <Box sx={styles.linksWrapper}>
          {isMobile && (
            <>
              {logo}
              {socialLinks}
            </>
          )}
          {links}
        </Box>
        {!isMobile && socialLinks}
      </Container>
      <Divider sx={styles.divider} />
      <Typography sx={styles.copyRight}>
        {t('footer.allRightsReserved')}
      </Typography>
    </>
  )
}

export default FooterByRole
