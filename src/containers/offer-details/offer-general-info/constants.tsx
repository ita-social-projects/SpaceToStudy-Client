import CategoryIcon from '@mui/icons-material/Category'
import BarChartIcon from '@mui/icons-material/BarChart'
import LanguageIcon from '@mui/icons-material/Language'
import SellIcon from '@mui/icons-material/Sell'
import DoneIcon from '@mui/icons-material/Done'

import IconTitleDescription from '~/components/icon-title-description/IconTitleDescription'

import { Offer } from '~/types'

const icon = <DoneIcon fontSize='small' sx={{ color: 'basic.orientalHerbs' }} />

const style = {
  container: {
    display: 'flex',
    columnGap: '5px'
  },
  icon: {
    display: 'flex',
    alignItems: 'center'
  },
  title: {
    typography: { xs: 'body2', sm: 'body1' }
  }
}

export const offerGeneralInfoMock = (offer: Offer) => {
  const { subject, languages, proficiencyLevel, price } = offer
  const { name } = subject

  return [
    {
      icon: <CategoryIcon />,
      title: 'offerDetailsPage.generalInfo.subject',
      description: name
    },
    {
      icon: <BarChartIcon />,
      title: 'offerDetailsPage.generalInfo.levels',
      description: proficiencyLevel.map((item) => (
        <IconTitleDescription icon={icon} key={item} sx={style} title={item} />
      ))
    },
    {
      icon: <LanguageIcon />,
      title: 'offerDetailsPage.generalInfo.languages',
      description: languages.map((item) => (
        <IconTitleDescription icon={icon} key={item} sx={style} title={item} />
      ))
    },
    {
      icon: <SellIcon />,
      title: 'offerDetailsPage.generalInfo.price',
      description: `${price} UAH/hour`
    }
  ]
}
