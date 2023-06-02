import { FC } from 'react'

import Typography from '@mui/material/Typography'

import HashLink from '~/components/hash-link/HashLink'
import { styles } from '~/components/direction-link/DirectionLink.styles'
import useBreakpoints from '~/hooks/use-breakpoints'
import { TypographyVariantEnum } from '~/types'

interface DirectionLinkProps {
  linkTo: string
  before?: React.ReactElement
  after?: React.ReactElement
  title: string
}

const DirectionLink: FC<DirectionLinkProps> = ({
  linkTo,
  title,
  before,
  after
}) => {
  const { isMobile } = useBreakpoints()
  return (
    <Typography
      component={HashLink}
      sx={styles.showAllOffers}
      to={linkTo}
      variant={
        isMobile ? TypographyVariantEnum.Caption : TypographyVariantEnum.Button
      }
    >
      {before}
      {title}
      {after}
    </Typography>
  )
}

export default DirectionLink
