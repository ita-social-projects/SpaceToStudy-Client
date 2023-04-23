import { FC, useMemo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import Box from '@mui/material/Box'

import useAxios from '~/hooks/use-axios'
import { categoryService } from '~/services/category-service'

import Loader from '~/components/loader/Loader'
import ClickableCard from '~/components/clickable-card/ClickableCard'
import { authRoutes } from '~/router/constants/authRoutes'
import { styles } from '~/components/popular-categories/PopularCategories.styles'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import serviceIcon from '~/assets/img/student-home-page/service_icon.png'
import ClickableCardList from '~/components/clickable-card-list/ClickableCardList'
import { CategoryInterface } from '~/types'
import useBreakpoints from '~/hooks/use-breakpoints'
import { defaultResponses } from '~/constants'

interface PopularCategoriesProps {
  title: string
  description?: string
}

const PopularCategories: FC<PopularCategoriesProps> = ({
  title,
  description
}) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { isDesktop, isTablet, isMobile } = useBreakpoints()

  const getCategories = useCallback(
    () => categoryService.getCategories({ limit: 9 }),
    []
  )
  const { response, loading } = useAxios<CategoryInterface[]>({
    service: getCategories,
    defaultResponse: defaultResponses.array
  })

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
      response.slice(0, itemsToShow).map((item) => {
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
    [response, t, itemsToShow]
  )

  const onClickButton = () => {
    navigate(authRoutes.categories.path)
  }

  return (
    <Box sx={styles.wrapper}>
      <TitleWithDescription
        description={description}
        style={styles.titleWithDescription}
        title={title}
      />
      {loading && !response ? (
        <Loader size={70} />
      ) : (
        <ClickableCardList
          btnText={t('common.viewAllName', { name: 'categories' })}
          cards={cards}
          onClick={onClickButton}
        />
      )}
    </Box>
  )
}

export default PopularCategories
