import { FC } from 'react'

import Button from '~scss-components/button/Button'
import AppCard from '~/components/app-card/AppCard'
import ImgTitleDescription from '~/components/img-title-description/ImgTitleDescription'

import { styles } from '~/components/info-card/InfoCard.styles'

interface InfoCardProps {
  img: string
  title: string
  description: string
  actionLabel: string
  cardWidth: number
  action: () => void
}

const InfoCard: FC<InfoCardProps> = ({
  img,
  title,
  description,
  actionLabel,
  cardWidth,
  action
}) => {
  return (
    <AppCard sx={{ ...styles.card, maxWidth: cardWidth }}>
      <ImgTitleDescription
        description={description}
        img={img}
        style={styles.imgTitleDescription}
        title={title}
      />
      <Button onClick={action} sx={styles.button}>
        {actionLabel}
      </Button>
    </AppCard>
  )
}

export default InfoCard
