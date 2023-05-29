import { FC } from 'react'

import Box from '@mui/material/Box'
import { Typography } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import TurnedInNot from '@mui/icons-material/TurnedInNot'
import { useTranslation } from 'react-i18next'

import AppChip from '~/components/app-chip/AppChip'
import AppCard from '~/components/app-card/AppCard'
import AppButton from '~/components/app-button/AppButton'
import ImgTitleDescription from '~/components/img-title-description/ImgTitleDescription'

import { styles } from '~/components/offer-banner/OfferBanner.styles'
import useBreakpoints from '~/hooks/use-breakpoints'

import { ButtonActions, Offer, ProficiencyLevelEnum } from '~/types'

interface OfferBannerProps {
  offer: Offer
  buttonActions: ButtonActions[]
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
          onClick={elem.handleClick}
          {...elem.buttonProps}
          sx={styles.button}
          variant={elem.variant}
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

  const fullName = `${authorFirstName} ${authorLastName}`

  return (
    <Box sx={styles.main}>
      <AppCard sx={styles.root}>
        <Box sx={styles.mainBlock}>
          <ImgTitleDescription
            img={author.photo}
            imgComponent={Avatar}
            style={styles.userInfo}
            title={fullName}
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
