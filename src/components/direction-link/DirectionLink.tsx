import { FC } from 'react'

import Typography from '@mui/material/Typography'

import HashLink from '~/components/hash-link/HashLink'
import { styles } from '~/components/direction-link/DirectionLink.styles'

type DirectionArray = 'before' | 'after'

export interface DirectionLinkProps {
  directionArray: DirectionArray
  linkTo: string
  before?: React.ReactElement
  after?: React.ReactElement
  title: string
}

const DirectionLink: FC<DirectionLinkProps> = ({ linkTo, title, before, after }) => {
  return (
    <Typography
      component={ HashLink } sx={ styles.showAllOffers } to={ linkTo }
      variant='button'
    >
      { before }
      { title }
      { after }
    </Typography>
  )
}

export default DirectionLink
