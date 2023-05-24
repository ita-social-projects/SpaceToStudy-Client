import { FC, useMemo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import Box from '@mui/material/Box'

import useAxios from '~/hooks/use-axios'
import { categoryService } from '~/services/category-service'

import Loader from '~/components/loader/Loader'
import CardWithLink from '~/components/card-with-link/CardWithLink'
import { authRoutes } from '~/router/constants/authRoutes'
import { styles } from '~/components/popular-categories/PopularCategories.styles'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import serviceIcon from '~/assets/img/student-home-page/service_icon.png'
import CardsList from '~/components/cards-list/CardsList'
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

  const getCategories = useCallback(
    () => categoryService.getCategories({ limit: itemsToShow }),
    [itemsToShow]
  )
  const { response, loading } = useAxios<CategoryInterface[]>({
    service: getCategories,
    defaultResponse: defaultResponses.array
  })

  const cards = useMemo(
    () =>
      response.map((item) => {
        return (
          <CardWithLink
            description={`${item.totalOffers} ${t('common.offers')}`}
            img={serviceIcon}
            key={item._id}
            link={`${authRoutes.subjects.path}?categoryId=${item._id}`}
            title={item.name}
          />
        )
      }),
    [response, t]
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
        <CardsList
          btnText={t('common.goToName', { name: 'categories' })}
          cards={cards}
          onClick={onClickButton}
        />
      )}
    </Box>
  )
}

export default PopularCategories
