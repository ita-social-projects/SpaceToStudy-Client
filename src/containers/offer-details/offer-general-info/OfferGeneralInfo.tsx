import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CategoryIcon from '@mui/icons-material/Category'
import BarChartIcon from '@mui/icons-material/BarChart'
import LanguageIcon from '@mui/icons-material/Language'
import SellIcon from '@mui/icons-material/Sell'
import DoneIcon from '@mui/icons-material/Done'

import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import IconTitleDescription from '~/components/icon-title-description/IconTitleDescription'
import AppCard from '~/components/app-card/AppCard'

import { styles } from '~/containers/offer-details/offer-general-info/OfferGeneralInfo.styles'
import { Offer, SizeEnum } from '~/types'

interface OfferGeneralInfo {
  offer: Offer
}

const OfferGeneralInfo: FC<OfferGeneralInfo> = ({ offer }) => {
  const { t } = useTranslation()
  const { subject, languages, proficiencyLevel, price } = offer
  const { name } = subject

  const generateBlock = (items: string[]) =>
    items.map((item) => (
      <TitleWithDescription
        description={item}
        key={item}
        style={styles.titleWithDescription}
        title={<DoneIcon fontSize={SizeEnum.Small} sx={styles.doneIcon} />}
      />
    ))

  const cardItems = [
    {
      icon: <CategoryIcon />,
      title: t('offerDetailsPage.generalInfo.subject'),
      description: name
    },
    {
      icon: <BarChartIcon />,
      title: t('offerDetailsPage.generalInfo.levels'),
      description: generateBlock(proficiencyLevel)
    },
    {
      icon: <LanguageIcon />,
      title: t('offerDetailsPage.generalInfo.languages'),
      description: generateBlock(languages)
    },
    {
      icon: <SellIcon />,
      title: t('offerDetailsPage.generalInfo.price'),
      description: `${price} ${t('common.uahSlashHour')}`
    }
  ]

  const generalInfoCards = cardItems.map((item) => (
    <AppCard key={item.title} sx={styles.card}>
      <IconTitleDescription
        description={item.description}
        icon={item.icon}
        sx={styles.iconTitleDescription}
        title={item.title}
      />
    </AppCard>
  ))

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
