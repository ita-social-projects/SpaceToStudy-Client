import { FC } from 'react'
import Box from '@mui/material/Box'
import { Typography } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import TurnedInNot from '@mui/icons-material/TurnedInNot'
import {
  ButtonActions,
  Offer,
  ProficiencyLevelEnum,
  VariantEnum
} from '~/types'
import { styles } from '~/components/offer-banner/OfferBanner.styles'
import AppChip from '~/components/app-chip/AppChip'
import AppButton from '~/components/app-button/AppButton'
import OfferAvatarAndName from './offer-avatar-and-name/OfferAvatarAndName'

import { useTranslation } from 'react-i18next'

interface OfferBannerProps {
  offer: Offer
  buttonActions: ButtonActions[]
}

const OfferBanner: FC<OfferBannerProps> = ({ offer, buttonActions }) => {
  const { t } = useTranslation()
  const { author, authorFirstName, authorLastName, subject, proficiencyLevel } =
    offer

  const buttons = buttonActions.map((elem, index) => (
    <AppButton
      fullWidth
      key={elem.label}
      onClick={elem.handleClick}
      sx={styles.button}
      variant={index !== 0 ? VariantEnum.Tonal : VariantEnum.Contained}
    >
      {elem.label}
    </AppButton>
  ))

  const lastLevel =
    proficiencyLevel.length > 1
      ? proficiencyLevel[proficiencyLevel.length - 1]
      : proficiencyLevel[0]
  const levelText =
    lastLevel === ProficiencyLevelEnum.Beginner
      ? t('common.beginner')
      : `${t('common.beginner')} - ${lastLevel}`.toUpperCase()

  return (
    <Box sx={styles.main}>
      <Box sx={styles.root}>
        <Box sx={styles.mainBlock}>
          <OfferAvatarAndName
            authorFirstName={authorFirstName}
            authorLastName={authorLastName}
            imgSrc={author.photo}
          />
          <AppChip labelSx={styles.subjectChipLabel} sx={styles.subjectChip}>
            {subject.name}
          </AppChip>
          <AppChip labelSx={styles.levelChipLabel} sx={styles.levelChip}>
            {levelText}
          </AppChip>
        </Box>
        <Box sx={styles.buttonsBlock}>
          <Box sx={styles.buttons}>{buttons}</Box>
          <IconButton data-testid='iconButton' sx={styles.bookmarkButton}>
            <TurnedInNot />
          </IconButton>
          <Typography sx={styles.bookmarkButtonText}>Save Offer</Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default OfferBanner
