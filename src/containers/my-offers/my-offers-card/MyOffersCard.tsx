import { FC } from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { useTranslation } from 'react-i18next'

import AppChip from '~/components/app-chip/AppChip'
import AppButton from '~/components/app-button/AppButton'
import TitleWithDescripiton from '~/components/title-with-description/TitleWithDescription'
import StatusChip from '~/components/status-chip/StatusChip'

import { ButtonActions, Offer, ProficiencyLevelEnum, SizeEnum } from '~/types'

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

  const { price, title, subject, status, proficiencyLevel } = offer

  const lastLevel =
    proficiencyLevel.length > 1
      ? proficiencyLevel[proficiencyLevel.length - 1]
      : proficiencyLevel[0]
  const levelText =
    lastLevel === ProficiencyLevelEnum.Beginner
      ? t('common.beginner')
      : `${t('common.beginner')} - ${lastLevel}`.toUpperCase()

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
      <Box sx={styles.chipsContainer}>
        <AppChip labelSx={styles.subjectChipLabel} sx={styles.subjectChip}>
          {subject.name}
        </AppChip>
        <AppChip labelSx={styles.levelChipLabel} sx={styles.levelChip}>
          {levelText}
        </AppChip>
      </Box>
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
