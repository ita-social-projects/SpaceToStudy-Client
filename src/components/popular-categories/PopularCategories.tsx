import { FC, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import Box from '@mui/material/Box'

import Loader from '~/components/loader/Loader'
import ClickableCard from '~/components/clickable-card/ClickableCard'
import { guestRoutes } from '~/router/constants/guestRoutes'
import { styles } from '~/components/popular-categories/PopularCategories.styles'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import serviceIcon from '~/assets/img/student-home-page/service_icon.png'
import ClickableCardList from '~/components/clickable-card-list/ClickableCardList'
import { CategoryInterface } from '~/types'
import useBreakpoints from '~/hooks/use-breakpoints'

interface PopularCategoriesProps {
  title: string
  description: string
  items: CategoryInterface[]
  loading: boolean
}

const PopularCategories: FC<PopularCategoriesProps> = ({ title, description, items, loading }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { isDesktop, isTablet, isMobile } = useBreakpoints()

  const itemsToShow = (isDesktop && 9) || (isTablet && 6) || (isMobile && 4) || 9

  const onClickCard = useCallback(
    (id) => {
      navigate(`${guestRoutes.subjects.path}?categoryId=${id}`)
    },
    [navigate]
  )

  const cards = useMemo(
    () =>
      items.slice(0, itemsToShow).map((item) => {
        return (
          <ClickableCard
            description={ `${item.totalOffers} ${t('common.offers')}` }
            img={ serviceIcon }
            key={ item._id }
            onClick={ () => onClickCard(item._id) }
            title={ item.name }
          />
        )
      }),
    [items, t, onClickCard, itemsToShow]
  )

  const onClickButton = () => {
    navigate(guestRoutes.categories.path)
  }

  return (
    <Box sx={ styles.wrapper }>
      <TitleWithDescription
        description={ description }
        descriptionStyles={ styles.descriptionStyles }
        title={ title }
        titleStyles={ styles.titleStyles }
      />
      { loading && !items ? (
        <Loader size={ 70 } />
      ) : (
        <ClickableCardList
          btnText={ t('common.viewAllName', { name: 'categories' }) }
          cards={ cards }
          isExpandable
          onClick={ onClickButton }
        />
      ) }
    </Box>
  )
}

export default PopularCategories
