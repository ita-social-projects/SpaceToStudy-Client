import { FC, useMemo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import Box from '@mui/material/Box'

import useAxios from '~/hooks/use-axios'
import { categoryService } from '~/services/category-service'
import { useAppSelector } from '~/hooks/use-redux'

import Loader from '~/components/loader/Loader'
import CardWithLink from '~/components/card-with-link/CardWithLink'
import { authRoutes } from '~/router/constants/authRoutes'
import { styles } from '~/components/popular-categories/PopularCategories.styles'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import serviceIcon from '~/assets/img/student-home-page/service_icon.png'
import CardsList from '~/components/cards-list/CardsList'
import { CategoryInterface, UserRoleEnum } from '~/types'
import useBreakpoints from '~/hooks/use-breakpoints'
import { getScreenBasedLimit } from '~/utils/helper-functions'
import { defaultResponses } from '~/constants'
import { itemsLoadLimit } from '~/components/popular-categories/PopularCategories.constants'

interface PopularCategoriesProps {
  title: string
  description?: string
}

const PopularCategories: FC<PopularCategoriesProps> = ({
  title,
  description
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
  const { response, loading } = useAxios<CategoryInterface[]>({
    service: getCategories,
    defaultResponse: defaultResponses.array
  })

  const currentRole =
    userRole === UserRoleEnum.Tutor ? UserRoleEnum.Tutor : UserRoleEnum.Student

  const cards = useMemo(
    () =>
      response.map((item) => {
        return (
          <CardWithLink
            description={`${item.totalOffers[currentRole]} ${t(
              'common.offers'
            )}`}
            img={serviceIcon}
            key={item._id}
            link={`${authRoutes.subjects.path}?categoryId=${item._id}`}
            title={item.name}
          />
        )
      }),
    [response, currentRole, t]
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
