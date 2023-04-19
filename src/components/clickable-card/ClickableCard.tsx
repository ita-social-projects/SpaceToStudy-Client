import { FC } from 'react'
import Box from '@mui/material/Box'

import AppCard from '~/components/app-card/AppCard'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

import { styles } from '~/components/clickable-card/ClickableCard.styles'

interface ClickableCardProps {
  img: string
  title: string
  description: string
  link: string
}

const ClickableCard: FC<ClickableCardProps> = ({
  img,
  title,
  description,
  link
}) => {
  return (
    <AppCard link={link}>
      <Box alt='item image' component='img' src={img} sx={styles.img} />
      <TitleWithDescription
        componentStyles={styles.titleWithDescription}
        description={description}
        descriptionStyles={styles.description}
        title={title}
        titleStyles={styles.title}
      />
    </AppCard>
  )
}

export default ClickableCard
