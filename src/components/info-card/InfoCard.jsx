import AppButton from '~/components//app-button/AppButton'
import AppCard from '~/components/app-card/AppCard'
import ImgTitleDescription from '~/components/img-title-description/ImgTitleDescription'

import { styles } from '~/components/info-card/InfoCard.styles'

const InfoCard = ({
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
      <AppButton onClick={action} sx={styles.button}>
        {actionLabel}
      </AppButton>
    </AppCard>
  )
}

export default InfoCard
