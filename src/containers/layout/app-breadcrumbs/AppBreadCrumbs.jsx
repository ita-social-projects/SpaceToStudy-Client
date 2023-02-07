import { Link, useMatches } from 'react-router-dom'
import { Breadcrumbs, Typography, Container } from '@mui/material'

import { styles } from '~/containers/layout/app-breadcrumbs/AppBreadCrumbs.styles'

const AppBreadCrumbs = () => {
  const matches = useMatches()
  const crumbs = matches.filter((match) => Boolean(match.handle?.crumb)).map((match) => match.handle.crumb)

  const breadCrumbs = crumbs.map((crumb, idx) => {
    const isLast = idx === crumbs.length - 1
    const component = isLast ? Typography : Link

    return (
      <Typography
        component={ component }
        data-testid='breadCrumb'
        key={ crumb.path }
        sx={ styles.link }
        to={ crumb.path }
        underline='none'
        variant='caption'
      >
        { crumb.name }
      </Typography>
    )
  })

  const separator = <Typography sx={ styles.separator } />

  return (
    crumbs.length > 1 && (
      <Container sx={ styles.root }>
        <Breadcrumbs separator={ separator }>
          { breadCrumbs }
        </Breadcrumbs>
      </Container>
    )
  )
}

export default AppBreadCrumbs
