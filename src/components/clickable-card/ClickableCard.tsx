import { FC } from 'react'
import Box from '@mui/material/Box'

import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

import { styles } from '~/components/clickable-card/ClickableCard.styles'

interface ClickableCardProps {
  img: string
  title: string
  description: string
  onClick: () => void
}

const ClickableCard: FC<ClickableCardProps> = ({ img, title, description, onClick }) => {
  return (
    <Box data-testid='clickable-card' onClick={ onClick } sx={ styles.card }>
      <Box
        alt='item image' component='img' src={ img }
        sx={ { mr: '24px', minWidth: '62px' } }
      />
      <TitleWithDescription
        componentStyles={ { margin: '0px', mb: '0px', textAlign: 'start' } }
        description={ description }
        descriptionStyles={ { typography: { xs: 'body2' }, color: 'primary.500' } }
        title={ title }
        titleStyles={ { m: '0', typography: { xs: 'h6' } } }
      />
    </Box>
  )
}

export default ClickableCard
