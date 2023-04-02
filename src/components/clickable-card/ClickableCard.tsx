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
        sx={ styles.img }
      />
      <TitleWithDescription
        componentStyles={ styles.titleWithDescription }
        description={ description }
        descriptionStyles={ styles.description }
        title={ title }
        titleStyles={ styles.title }
      />
    </Box>
  )
}

export default ClickableCard
