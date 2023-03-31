import { FC } from 'react'

import Typography from '@mui/material/Typography'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import HashLink from '~/components/hash-link/HashLink'
import { styles } from '~/components/direction-link/DirectionLink.styles'
import { DirectionLinkProps } from '~/types'

const DirectionLink: FC<DirectionLinkProps> = ({ directionArray, linkTo, title }) => {
  return (
    <Typography
      component={ HashLink } sx={ styles.showAllOffers } to={ linkTo }
      variant='button'
    >
      { directionArray === 'before' && <ArrowBackIcon fontSize='small' /> }
      { title }
      { directionArray === 'after' && <ArrowForwardIcon fontSize='small' /> }
    </Typography>
  )
}

export default DirectionLink
