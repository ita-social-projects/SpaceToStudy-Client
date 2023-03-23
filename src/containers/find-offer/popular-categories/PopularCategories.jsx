import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import ClickableCard from '~/components/clickable-card/ClickableCard'

import { guestRoutes } from '~/router/constants/guestRoutes'
import { styles } from '~/containers/find-offer/popular-categories/PopularCategories.styles'

const PopularCategories = ({ items }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const handleChange = () => {
    navigate(guestRoutes.categories.path)
  }

  const popularCategoryItems = useMemo(
    () =>
      items.slice(0, 9).map((item) => {
        return (
          <ClickableCard
            action={ () => navigate(item.link) }
            description={ item.description }
            img={ item.img }
            key={ item.id }
            title={ item.title }
          />
        )
      }),
    [items, navigate]
  )

  return (
    <Box sx={ { m: '100px auto' } }>
      <Typography sx={ { mb: '32px' } } variant='h4'>
        { t('common.popularCategories') }
      </Typography>
      <Box sx={ styles.wrapper }>
        <Box sx={ styles.cardsContainer }>
          { popularCategoryItems }
        </Box>
        <Button
          onClick={ handleChange } size='extraLarge' sx={ { margin: '0 auto' } }
          variant='tonal'
        >
          { t('common.viewAllName', { name: 'categories' }) }
        </Button>
      </Box>
    </Box>
  )
}

export default PopularCategories
