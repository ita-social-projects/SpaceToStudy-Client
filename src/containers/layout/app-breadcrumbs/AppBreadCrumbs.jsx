import { Breadcrumbs, Container, Typography } from '@mui/material'
import { Link, useMatches } from 'react-router-dom'

import { styles } from '~/containers/layout/app-breadcrumbs/AppBreadCrumbs.styles'

const AppBreadCrumbs = () => {
  const matches = useMatches()
  const crumbs = matches
    .filter((match) => Boolean(match.handle?.crumb))
    .map((match) =>
      typeof match.handle.crumb === 'function'
        ? match.handle.crumb(match.data)
        : match.handle.crumb
    )
    .flat()

  const breadCrumbs = crumbs.map((crumb, idx) => {
    const isLast = idx === crumbs.length - 1
    const component = isLast ? Typography : Link

    return (
      <Typography
        component={component}
        data-testid='breadCrumb'
        key={crumb.name}
        sx={isLast ? styles.link : styles.previous}
        to={crumb.path}
      >
        {crumb.name}
      </Typography>
    )
  })

  const separator = <Typography sx={styles.separator} />

  return crumbs.length > 1 ? (
    <Container maxWidth='xl' sx={styles.root}>
      <Breadcrumbs separator={separator} sx={styles.breadCrumbs}>
        {breadCrumbs}
      </Breadcrumbs>
    </Container>
  ) : null
}

export default AppBreadCrumbs
