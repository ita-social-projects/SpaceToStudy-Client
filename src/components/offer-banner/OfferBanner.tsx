import { FC } from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import TurnedInNot from '@mui/icons-material/TurnedInNot'
import { useTranslation } from 'react-i18next'

import useBreakpoints from '~/hooks/use-breakpoints'
import AppChip from '~/components/app-chip/AppChip'
import AppCard from '~/components/app-card/AppCard'
import AppButton from '~/components/app-button/AppButton'
import UserProfileInfo from '~/components/user-profile-info/UserProfileInfo'

import { ButtonActions, Offer, ProficiencyLevelEnum } from '~/types'
import { styles } from '~/components/offer-banner/OfferBanner.styles'

interface OfferBannerProps {
  offer: Offer
  buttonActions: (ButtonActions | null)[]
}

const OfferBanner: FC<OfferBannerProps> = ({ offer, buttonActions }) => {
  const { t } = useTranslation()
  const { isDesktop } = useBreakpoints()
  const { author, authorFirstName, authorLastName, subject, proficiencyLevel } =
    offer
  const buttons = buttonActions.map(
    (elem) =>
      elem && (
        <AppButton
          fullWidth
          key={elem.label}
          sx={styles.button}
          {...elem.buttonProps}
        >
          {elem.label}
        </AppButton>
      )
  )

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
      <AppCard sx={styles.root}>
        <Box sx={styles.mainBlock}>
          <UserProfileInfo
            firstName={authorFirstName}
            lastName={authorLastName}
            photo={author.photo}
            sx={styles.userInfo}
          />
          {isDesktop && (
            <>
              <AppChip
                labelSx={styles.subjectChipLabel}
                sx={styles.subjectChip}
              >
                {subject.name}
              </AppChip>
              <AppChip labelSx={styles.levelChipLabel} sx={styles.levelChip}>
                {levelText}
              </AppChip>
            </>
          )}
        </Box>
        <Box sx={styles.buttonsBlock}>
          <Box sx={styles.buttons}>{buttons}</Box>
          <IconButton data-testid='iconButton' sx={styles.bookmarkButton}>
            <TurnedInNot />
          </IconButton>
          {isDesktop && (
            <Typography sx={styles.bookmarkButtonText}>
              {t('offerDetailsPage.offerBanner.saveOfferButton')}
            </Typography>
          )}
        </Box>
      </AppCard>
    </Box>
  )
}

export default OfferBanner
