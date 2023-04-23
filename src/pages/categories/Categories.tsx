import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { categoryService } from '~/services/category-service'

import Container from '@mui/material/Container'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

import useLoadMore from '~/hooks/use-load-more'
import useCategoriesNames from '~/hooks/use-categories-names'

import OfferRequestBlock from '~/containers/find-offer/OfferRequestBlock'
import ClickableCard from '~/components/clickable-card/ClickableCard'
import ClickableCardList from '~/components/clickable-card-list/ClickableCardList'
import SearchAutocomplete from '~/components/search-autocomplete/SearchAutocomplete'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import AppToolbar from '~/components/app-toolbar/AppToolbar'
import DirectionLink from '~/components/direction-link/DirectionLink'

import { CategoryInterface, CategoryNameInterface, Params } from '~/types'
import { guestRoutes } from '~/router/constants/guestRoutes'
import { mapArrayByField } from '~/utils/map-array-by-field'
import serviceIcon from '~/assets/img/student-home-page/service_icon.png'
import { styles } from '~/pages/categories/Categories.styles'

const Categories = () => {
  const { t } = useTranslation()
  const [match, setMatch] = useState<string>('')
  const params = useMemo(() => ({ name: match }), [match])

  const transform = useCallback(
    (data: CategoryNameInterface[]): string[] => mapArrayByField(data, 'name'),
    []
  )

  const getCategories = useCallback(
    (params: Partial<Params>) => categoryService.getCategories(params),
    []
  )

  const { loading: categoriesNamesLoading, response: categoriesNamesItems } =
    useCategoriesNames<string>({ transform })

  const {
    data: categories,
    loading: categoriesLoading,
    resetData,
    loadMore,
    isExpandable
  } = useLoadMore<CategoryInterface>({
    service: getCategories,
    limit: 12,
    params
  })

  const cards = useMemo(
    () =>
      categories.map((item: CategoryInterface) => {
        return (
          <ClickableCard
            description={`${item.totalOffers} ${t('categoriesPage.offers')}`}
            img={serviceIcon}
            key={item._id}
            link={`${guestRoutes.subjects.path}?categoryId=${item._id}`}
            title={item.name}
          />
        )
      }),
    [categories, t]
  )

  return (
    <Container sx={styles.container}>
      <OfferRequestBlock />

      <TitleWithDescription
        description={t('categoriesPage.description')}
        descriptionStyles={styles.sectionDescription}
        title={t('categoriesPage.title')}
        titleStyles={styles.sectionTitle}
      />

      <DirectionLink
        after={<ArrowForwardIcon fontSize='small' />}
        linkTo={guestRoutes.findOffers.path}
        title={t('categoriesPage.showAllOffers')}
      />

      <AppToolbar sx={styles.searchToolbar}>
        <SearchAutocomplete
          loading={categoriesNamesLoading}
          options={categoriesNamesItems}
          resetData={resetData}
          search={match}
          setSearch={setMatch}
          textFieldProps={{
            label: t('categoriesPage.searchLabel')
          }}
        />
      </AppToolbar>

      <ClickableCardList
        btnText={t('categoriesPage.viewMore')}
        cards={cards}
        isExpandable={isExpandable}
        loading={categoriesLoading}
        onClick={loadMore}
      />
    </Container>
  )
}

export default Categories
