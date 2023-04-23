import { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import Box from '@mui/material/Box'

import Loader from '~/components/loader/Loader'
import ClickableCard from '~/components/clickable-card/ClickableCard'
import { authRoutes } from '~/router/constants/authRoutes'
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

const PopularCategories: FC<PopularCategoriesProps> = ({
  title,
  description,
  items,
  loading
}) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { isDesktop, isTablet, isMobile } = useBreakpoints()

  const itemsToShow = useMemo(() => {
    switch (true) {
      case isDesktop:
        return 9
      case isTablet:
        return 6
      case isMobile:
        return 4
      default:
        return 9
    }
  }, [isDesktop, isTablet, isMobile])

  const cards = useMemo(
    () =>
      items.slice(0, itemsToShow).map((item) => {
        return (
          <ClickableCard
            description={`${item.totalOffers} ${t('common.offers')}`}
            img={serviceIcon}
            key={item._id}
            link={`${authRoutes.subjects.path}?categoryId=${item._id}`}
            title={item.name}
          />
        )
      }),
    [items, t, itemsToShow]
  )

  const onClickButton = () => {
    navigate(authRoutes.categories.path)
  }

  return (
    <Box sx={styles.wrapper}>
      <TitleWithDescription
        description={description}
        descriptionStyles={styles.descriptionStyles}
        title={title}
        titleStyles={styles.titleStyles}
      />
      {loading && !items ? (
        <Loader size={70} />
      ) : (
        <ClickableCardList
          btnText={t('common.viewAllName', { name: 'categories' })}
          cards={cards}
          isExpandable
          onClick={onClickButton}
        />
      )}
    </Box>
  )
}

export default PopularCategories
