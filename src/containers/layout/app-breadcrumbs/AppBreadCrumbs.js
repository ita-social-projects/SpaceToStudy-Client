import { useLocation, Link as RouterLink, matchPath } from 'react-router-dom'
import { Breadcrumbs, Link, Typography, Container } from '@mui/material'
import { t } from 'i18next'

import { guestRoutes } from '~/router/constants/guestRoutes'

import { styles } from '~/containers/layout/app-breadcrumbs/AppBreadCrumbs.styles'

const AppBreadCrumbs = () => {
  const { pathname } = useLocation()
  const { student, tutor, home, error } = guestRoutes
  const hasError = matchPath({ path: error.nested }, pathname)
  const locationWithoutHome = pathname.replace(student.route || tutor.route, '')
  const routes = !hasError ? locationWithoutHome.split('/').filter((route) => route) : []

  const homeCrumb = routes.length > 0 && (
    <Link
      component={ RouterLink } sx={ styles.link } to={ home.route }
      underline='none' variant='caption'
    >
      { t('pageNames.main') }
    </Link>
  )

  const crumbs = routes.map((route, idx) => {
    const href = `/${routes.slice(0, idx + 1).join('/')}`
    const name = t(`pageNames.${route}`)
    const isLast = idx === routes.length - 1

    return isLast ? (
      <Typography
        data-testid='lastBreadCrumb' key={ href } sx={ styles.link }
        variant='caption'
      >
        { name }
      </Typography>
    ) : (
      <Link
        component={ RouterLink }
        data-testid='breadCrumb'
        key={ href }
        sx={ styles.link }
        to={ href }
        underline='none'
        variant='caption'
      >
        { name }
      </Link>
    )
  })

  const separator = <Typography sx={ styles.separator } />

  return (
    homeCrumb && (
      <Container sx={ styles.root }>
        <Breadcrumbs separator={ separator }>
          { homeCrumb }
          { crumbs }
        </Breadcrumbs>
      </Container>
    )
  )
}

export default AppBreadCrumbs
