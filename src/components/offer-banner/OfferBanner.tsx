import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TurnedInNot from '@mui/icons-material/TurnedInNot'

import useBreakpoints from '~/hooks/use-breakpoints'
import AppCard from '~/components/app-card/AppCard'
import Button from '~scss-components/button/Button'
import UserProfileInfo from '~/components/user-profile-info/UserProfileInfo'
import SubjectLevelChips from '~/components/subject-level-chips/SubjectLevelChips'

import { ButtonActions, Offer } from '~/types'
import { styles } from '~/components/offer-banner/OfferBanner.styles'

interface OfferBannerProps {
  offer: Offer
  buttonActions: (ButtonActions | null)[]
}

const OfferBanner: FC<OfferBannerProps> = ({ offer, buttonActions }) => {
  const { t } = useTranslation()
  const { isLaptopAndAbove } = useBreakpoints()
  const { author, subject, category, proficiencyLevel, authorRole } = offer

  const buttons = buttonActions.map((elem) => {
    const variant = elem?.buttonProps?.variant === 'tonal' ? 'tonal' : 'primary'
    const { disabled, onClick } = elem?.buttonProps || {}
    return (
      elem && (
        <Button
          disabled={disabled}
          key={elem.label}
          onClick={onClick}
          variant={variant}
        >
          {t(elem.label)}
        </Button>
      )
    )
  })

  return (
    <Box sx={styles.main}>
      <AppCard sx={styles.root}>
        <Box sx={styles.mainBlock}>
          <UserProfileInfo
            _id={author._id}
            firstName={author.firstName}
            lastName={author.lastName}
            photo={author.photo}
            role={authorRole}
            sx={styles.userInfo}
          />
          {isLaptopAndAbove && (
            <SubjectLevelChips
              color={category.appearance.color}
              proficiencyLevel={proficiencyLevel}
              subject={subject.name}
              sx={styles.chipsContainer}
            />
          )}
        </Box>
        <Box sx={styles.buttonsBlock}>
          <Box sx={styles.buttons}>{buttons}</Box>
          <Button
            data-testid='iconButton'
            startIcon={<TurnedInNot />}
            sx={styles.bookmarkButton}
          >
            {isLaptopAndAbove && (
              <Typography>
                {t('offerDetailsPage.offerBanner.saveOfferButton')}
              </Typography>
            )}
          </Button>
        </Box>
      </AppCard>
    </Box>
  )
}

export default OfferBanner
