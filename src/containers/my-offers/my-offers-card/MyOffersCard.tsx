import { FC } from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { useTranslation } from 'react-i18next'

import AppButton from '~/components/app-button/AppButton'
import TitleWithDescripiton from '~/components/title-with-description/TitleWithDescription'
import StatusChip from '~/components/status-chip/StatusChip'
import SubjectLevelWithLabels from '~/components/subject-level-with-labels/SubjectLevelWithLabels'

import { ButtonActions, Offer, SizeEnum } from '~/types'

import { styles } from '~/containers/my-offers/my-offers-card/MyOffersCard.styles'
import Divider from '@mui/material/Divider'

interface OfferCardSquareProps {
  buttonActions?: (ButtonActions | null)[]
  offer: Offer
}

const OfferCardSquare: FC<OfferCardSquareProps> = ({
  buttonActions,
  offer
}) => {
  const { t } = useTranslation()

  const { price, title, subject, category, status, proficiencyLevel } = offer

  const buttons = buttonActions?.map(
    (elem) =>
      elem && (
        <AppButton
          fullWidth
          key={elem.label}
          size={SizeEnum.Medium}
          {...elem.buttonProps}
        >
          {elem.label}
        </AppButton>
      )
  )

  return (
    <Box sx={styles.container}>
      <Box>
        <StatusChip status={status} />
      </Box>
      <Typography sx={styles.title}>{title}</Typography>
      <Divider />
      <SubjectLevelWithLabels
        color={category.appearance.color}
        proficiencyLevel={proficiencyLevel}
        subject={subject.name}
      />
      <Box sx={styles.priceContainer}>
        <TitleWithDescripiton
          description={`/ ${t('common.hour')}`}
          style={styles.titleWithDescription}
          title={`${price} ${t('common.uah')}`}
        />
      </Box>
      <Box sx={styles.buttonContainer}>{buttons}</Box>
    </Box>
  )
}
export default OfferCardSquare
