import Box from '@mui/material/Box'
import { SxProps } from '@mui/material/styles'
import { useMemo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import CardWithLink from '~/components/card-with-link/CardWithLink'
import CardsList from '~/components/cards-list/CardsList'
import Loader from '~/components/loader/Loader'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import useBreakpoints from '~/hooks/use-breakpoints'
import { useAppSelector } from '~/hooks/use-redux'
import { authRoutes } from '~/router/constants/authRoutes'
import { categoryService } from '~/services/category-service'
import { type AxiosResponse } from 'axios'

import { itemsLoadLimit } from '~/components/popular-categories/PopularCategories.constants'
import {
  getOpositeRole,
  getScreenBasedLimit,
  spliceSx
} from '~/utils/helper-functions'
import { CategoryInterface, ItemsWithCount, SortEnum } from '~/types'
import { styles } from '~/components/popular-categories/PopularCategories.styles'
import { titleToCamel } from '~/utils/title-to-camel-case'
import useQuery from '~/hooks/use-query'

interface PopularCategoriesProps {
  description?: string
  sx?: SxProps
  title: string
}

const PopularCategories: React.FC<PopularCategoriesProps> = ({
  description,
  sx,
  title
}) => {
  const { t } = useTranslation()
  const { userRole } = useAppSelector((state) => state.appMain)
  const navigate = useNavigate()
  const breakpoints = useBreakpoints()

  const itemsToShow = useMemo(
    () => getScreenBasedLimit(breakpoints, itemsLoadLimit),
    [breakpoints]
  )

  const getCategories = useCallback(async (): Promise<
    ItemsWithCount<CategoryInterface>
  > => {
    const response: AxiosResponse<ItemsWithCount<CategoryInterface>> =
      await categoryService.getCategories({
        limit: itemsToShow,
        sort: { order: SortEnum.Desc, orderBy: 'totalOffersSum' }
      })
    return response.data
  }, [itemsToShow])

  const { data, isLoading } = useQuery<ItemsWithCount<CategoryInterface>>({
    queryKey: ['popularCategories', itemsToShow],
    queryFn: getCategories
  })

  const oppositeRole = useMemo(() => getOpositeRole(userRole), [userRole])

  const cards = useMemo(() => {
    const items = data?.items ?? []
    return items.map((item) => (
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
    ))
  }, [data, oppositeRole, t])

  const handleButtonClick = () => {
    navigate(authRoutes.categories.path)
  }

  return (
    <Box sx={spliceSx(styles.wrapper, sx)}>
      <TitleWithDescription
        description={description}
        style={styles.titleWithDescription}
        title={title}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <CardsList
          btnText={t('common.goToCategories')}
          cards={cards}
          onClick={handleButtonClick}
        />
      )}
    </Box>
  )
}

export default PopularCategories
