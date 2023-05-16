import { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import IconTitleDescription from '~/components/icon-title-description/IconTitleDescription'
import AppCard from '~/components/app-card/AppCard'

import { offerGeneralInfoMock } from '~/containers/offer-details/offer-general-info/constants'
import { styles } from '~/containers/offer-details/offer-general-info/OfferGeneralInfo.styles'
import { Offer } from '~/types'

interface OfferGeneralInfo {
  offer: Offer
}

const OfferGeneralInfo: FC<OfferGeneralInfo> = ({ offer }) => {
  const { t } = useTranslation()
  const items = offerGeneralInfoMock(offer)

  const generalInfoCards = useMemo(
    () =>
      items.map((item) => (
        <AppCard key={item.title} sx={styles.card}>
          <IconTitleDescription
            description={item.description}
            icon={item.icon}
            sx={styles.iconTitleDescription}
            title={t(item.title)}
          />
        </AppCard>
      )),
    [items, t]
  )

  return (
    <Box sx={styles.container}>
      <Typography sx={styles.title}>
        {t('offerDetailsPage.generalInfo.title')}
      </Typography>

      <Box sx={styles.cardsContainer}>{generalInfoCards}</Box>
    </Box>
  )
}

export default OfferGeneralInfo
