import { FC, useMemo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import Box from '@mui/material/Box'
import { SxProps } from '@mui/material/styles'

import useAxios from '~/hooks/use-axios'
import { categoryService } from '~/services/category-service'
import { useAppSelector } from '~/hooks/use-redux'
import Loader from '~/components/loader/Loader'
import CardWithLink from '~/components/card-with-link/CardWithLink'
import { authRoutes } from '~/router/constants/authRoutes'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import serviceIcon from '~/assets/img/student-home-page/service_icon.png'
import CardsList from '~/components/cards-list/CardsList'
import { CategoryInterface, ItemsWithCount } from '~/types'
import useBreakpoints from '~/hooks/use-breakpoints'

import {
  getScreenBasedLimit,
  spliceSx,
  getOpositeRole
} from '~/utils/helper-functions'
import { styles } from '~/components/popular-categories/PopularCategories.styles'
import { defaultResponses } from '~/constants'
import { itemsLoadLimit } from '~/components/popular-categories/PopularCategories.constants'

interface PopularCategoriesProps {
  title: string
  description?: string
  sx?: SxProps
}

const PopularCategories: FC<PopularCategoriesProps> = ({
  title,
  description,
  sx
}) => {
  const { t } = useTranslation()
  const { userRole } = useAppSelector((state) => state.appMain)
  const navigate = useNavigate()
  const breakpoints = useBreakpoints()

  const itemsToShow = getScreenBasedLimit(breakpoints, itemsLoadLimit)

  const getCategories = useCallback(
    () => categoryService.getCategories({ limit: itemsToShow }),
    [itemsToShow]
  )
  const { response, loading } = useAxios<ItemsWithCount<CategoryInterface>>({
    service: getCategories,
    defaultResponse: defaultResponses.itemsWithCount
  })

  const oppositeRole = getOpositeRole(userRole)

  const cards = useMemo(
    () =>
      response.items.map((item) => (
        <CardWithLink
          description={`${item.totalOffers[oppositeRole]} ${t(
            'common.offers'
          )}`}
          img={serviceIcon}
          key={item._id}
          link={`${authRoutes.subjects.path}?categoryId=${item._id}`}
          title={item.name}
        />
      )),
    [response.items, oppositeRole, t]
  )

  const onClickButton = () => {
    navigate(authRoutes.categories.path)
  }

  return (
    <Box sx={spliceSx(styles.wrapper, sx)}>
      <TitleWithDescription
        description={description}
        style={styles.titleWithDescription}
        title={title}
      />
      {loading && !response ? (
        <Loader />
      ) : (
        <CardsList
          btnText={t('common.goToCategories')}
          cards={cards}
          onClick={onClickButton}
        />
      )}
    </Box>
  )
}

export default PopularCategories
