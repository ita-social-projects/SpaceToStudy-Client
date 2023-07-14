import Typography from '@mui/material/Typography'

import { styles } from '~/components/direction-link/DirectionLink.styles'
import HashLink from '~/components/hash-link/HashLink'
import useBreakpoints from '~/hooks/use-breakpoints'
import { TypographyVariantEnum } from '~/types'

const DirectionLink = ({ linkTo, title, before, after }) => {
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
