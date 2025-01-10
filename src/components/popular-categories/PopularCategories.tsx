import Box from '@mui/material/Box'
import { SxProps } from '@mui/material/styles'
import { FC, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import CardWithLink from '~/components/card-with-link/CardWithLink'
import CardsList from '~/components/cards-list/CardsList'
import Loader from '~/components/loader/Loader'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import useQuery from '~/hooks/use-query'
import useBreakpoints from '~/hooks/use-breakpoints'
import { useAppSelector } from '~/hooks/use-redux'
import { authRoutes } from '~/router/constants/authRoutes'
import { categoryService } from '~/services/category-service'

import { itemsLoadLimit } from '~/components/popular-categories/PopularCategories.constants'
import { defaultResponses } from '~/constants'
import {
  getOpositeRole,
  getScreenBasedLimit,
  spliceSx
} from '~/utils/helper-functions'
import { SortEnum } from '~/types'
import { styles } from '~/components/popular-categories/PopularCategories.styles'
import { titleToCamel } from '~/utils/title-to-camel-case'

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
    () =>
      categoryService.getCategories({
        limit: itemsToShow,
        sort: { order: SortEnum.Desc, orderBy: 'totalOffersSum' }
      }),
    [itemsToShow]
  )

  const { data, isLoading } = useQuery({
    queryFn: getCategories,
    queryKey: ['categories'],
    options: {
      initialData: defaultResponses.itemsWithCount
    }
  })

  const oppositeRole = getOpositeRole(userRole)

  const cards = useMemo(
    () =>
      data.items.map((item) => (
        <CardWithLink
          description={t('common.offerCount', {
            count: item.totalOffers[oppositeRole]
          })}
          icon={item.appearance.icon}
          iconColor={item.appearance.color}
          key={item._id}
          link={`${authRoutes.subjects.path}?categoryId=${item._id}`}
          title={t(`categories.${titleToCamel(item.name)}`, {
            defaultValue: item.name
          })}
        />
      )),
    [data, oppositeRole, t]
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
      {isLoading && !data ? (
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
