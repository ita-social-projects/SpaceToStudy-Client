import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

import Button from '~scss-components/button/Button'

import { guestRoutes } from '~/router/constants/guestRoutes'
import plantImg from '~/assets/img/error-page/404-plant.svg'
import manImg from '~/assets/img/error-page/404-man.svg'

import { styles } from '~/pages/error/styles/NotFound.styles'

const NotFound = () => {
  const { t } = useTranslation()

  return (
    <Box sx={styles.root}>
      <Box sx={styles.box}>
        <TitleWithDescription
          description={t('errorPage.404.description')}
          style={styles.titleWithDescription}
          title={t('errorPage.404.title')}
        />
        <Button
          component={Link}
          sx={styles.button}
          to={guestRoutes.home.path}
          size='lg'
        >
          {t('button.toMain')}
        </Button>
      </Box>

      <Box sx={styles.imgBox}>
        <Box
          alt='man with bag'
          component='img'
          src={manImg}
          sx={styles.manImg}
        />
        <Box
          alt='flowerpot'
          component='img'
          src={plantImg}
          sx={styles.plantImg}
        />
      </Box>
    </Box>
  )
}

export default NotFound
