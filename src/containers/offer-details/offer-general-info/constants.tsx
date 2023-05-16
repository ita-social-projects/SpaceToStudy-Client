import { TFunction } from 'react-i18next'
import CategoryIcon from '@mui/icons-material/Category'
import BarChartIcon from '@mui/icons-material/BarChart'
import LanguageIcon from '@mui/icons-material/Language'
import SellIcon from '@mui/icons-material/Sell'
import DoneIcon from '@mui/icons-material/Done'

import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import { Offer } from '~/types'

const style = {
  wrapper: {
    display: 'flex',
    columnGap: '5px'
  },
  title: {
    display: 'flex',
    alignItems: 'center'
  },
  description: {
    typography: { xs: 'body2', sm: 'body1' }
  }
}

const icon = <DoneIcon fontSize='small' sx={{ color: 'basic.orientalHerbs' }} />

export const offerGeneralInfoMock = (offer: Offer, t: TFunction) => {
  const { subject, languages, proficiencyLevel, price } = offer
  const { name } = subject

  return [
    {
      icon: <CategoryIcon />,
      title: t('offerDetailsPage.generalInfo.subject'),
      description: name
    },
    {
      icon: <BarChartIcon />,
      title: t('offerDetailsPage.generalInfo.levels'),
      description: proficiencyLevel.map((item) => (
        <TitleWithDescription
          description={item}
          key={item}
          style={style}
          title={icon}
        />
      ))
    },
    {
      icon: <LanguageIcon />,
      title: t('offerDetailsPage.generalInfo.languages'),
      description: languages.map((item) => (
        <TitleWithDescription
          description={item}
          key={item}
          style={style}
          title={icon}
        />
      ))
    },
    {
      icon: <SellIcon />,
      title: t('offerDetailsPage.generalInfo.price'),
      description: `${price} ${t('common.uahSlashHour')}`
    }
  ]
}
