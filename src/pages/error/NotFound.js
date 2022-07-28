import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { Button, Box } from '@mui/material'
import { routes } from '~/constants/routes'
import plantImg from '~/assets/img/error-page/404-plant.svg'
import manImg from '~/assets/img/error-page/404-man.svg'
import useBreakpoints from '~/hooks/use-breakpoints'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

import { style } from '~/pages/error/styles/not-found.style'

const NotFound = () => {
  const { t } = useTranslation()
  const windowSize = useBreakpoints()

  const sizesTypography = {
    desktop: { title: 'h2', description: 'subtitle1' },
    tablet: { title: 'h3', description: 'subtitle1' },
    mobile: { title: 'h4', description: 'subtitle2' }
  }

  return (
    <Box sx={style.root}>
      <Box sx={style.box}>
        <TitleWithDescription
          description={t('errorPage.404.description')}
          descriptionVariant={sizesTypography[windowSize].description}
          title={t('errorPage.404.title')}
          titleVariant={sizesTypography[windowSize].title}
        />
        <Button component={Link} sx={style.button} to={routes.home.route} variant="contained">
          {t('button.toMain')}
        </Button>
      </Box>

      <Box sx={style.imgBox}>
        <Box alt="man with bag" component="img" src={manImg} sx={style.manImg} />
        <Box alt="flowerpot" component="img" src={plantImg} sx={style.plantImg} />
      </Box>
    </Box>
  )
}

export default NotFound
