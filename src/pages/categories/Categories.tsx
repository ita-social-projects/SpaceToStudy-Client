import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Container from '@mui/material/Container'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

import { categoryService } from '~/services/category-service'
import { useModalContext } from '~/context/modal-context'
import useLoadMore from '~/hooks/use-load-more'
import useCategoriesNames from '~/hooks/use-categories-names'
import useBreakpoints from '~/hooks/use-breakpoints'
import { useAppSelector } from '~/hooks/use-redux'

import OfferRequestBlock from '~/containers/find-offer/offer-request-block/OfferRequestBlock'
import CardWithLink from '~/components/card-with-link/CardWithLink'
import CardsList from '~/components/cards-list/CardsList'
import SearchAutocomplete from '~/components/search-autocomplete/SearchAutocomplete'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import AppToolbar from '~/components/app-toolbar/AppToolbar'
import DirectionLink from '~/components/direction-link/DirectionLink'
import NotFoundResults from '~/components/not-found-results/NotFoundResults'
import CreateSubjectModal from '~/containers/find-offer/create-new-subject/CreateNewSubject'
import serviceIcon from '~/assets/img/student-home-page/service_icon.png'
import { getOpositeRole, getScreenBasedLimit } from '~/utils/helper-functions'

import {
  CategoryInterface,
  CategoryNameInterface,
  CategoriesParams,
  SizeEnum
} from '~/types'
import { itemsLoadLimit } from '~/constants'
import { authRoutes } from '~/router/constants/authRoutes'
import { styles } from '~/pages/categories/Categories.styles'

const Categories = () => {
  const { t } = useTranslation()
  const { userRole } = useAppSelector((state) => state.appMain)
  const breakpoints = useBreakpoints()
  const [match, setMatch] = useState<string>('')
  const params = useMemo(() => ({ name: match }), [match])
  const { openModal } = useModalContext()

  const cardsLimit = getScreenBasedLimit(breakpoints, itemsLoadLimit)

  const getCategories = useCallback(
    (data?: Partial<CategoriesParams>) => categoryService.getCategories(data),
    []
  )

  const {
    loading: categoriesNamesLoading,
    response: categoriesNamesItems,
    fetchData
  } = useCategoriesNames({ fetchOnMount: false })

  const {
    data: categories,
    loading: categoriesLoading,
    resetData,
    loadMore,
    isExpandable
  } = useLoadMore<CategoryInterface, Partial<CategoriesParams>>({
    service: getCategories,
    limit: cardsLimit,
    params
  })

  const oppositeRole = getOpositeRole(userRole)

  const cards = useMemo(
    () =>
      categories.map((item) => {
        return (
          <CardWithLink
            description={`${item.totalOffers[oppositeRole]} ${t(
              'categoriesPage.offers'
            )}`}
            img={serviceIcon}
            key={item._id}
            link={`${authRoutes.subjects.path}?categoryId=${item._id}`}
            title={item.name}
          />
        )
      }),
    [categories, oppositeRole, t]
  )

  const options = useMemo(
    () =>
      categoriesNamesItems.map((option: CategoryNameInterface) => option.name),
    [categoriesNamesItems]
  )

  const getCategoryNames = () =>
    !categoriesNamesItems.length && void fetchData()

  const handleOpenModal = () => openModal({ component: <CreateSubjectModal /> })

  return (
    <Container sx={styles.container}>
      <OfferRequestBlock />

      <TitleWithDescription
        description={t('categoriesPage.description')}
        style={styles.titleWithDescription}
        title={t('categoriesPage.title')}
      />

      <DirectionLink
        after={<ArrowForwardIcon fontSize={SizeEnum.Small} />}
        linkTo={authRoutes.findOffers.path}
        title={t('categoriesPage.showAllOffers')}
      />

      <AppToolbar sx={styles.searchToolbar}>
        <SearchAutocomplete
          loading={categoriesNamesLoading}
          onFocus={getCategoryNames}
          onSearchChange={resetData}
          options={options}
          search={match}
          setSearch={setMatch}
          textFieldProps={{
            label: t('categoriesPage.searchLabel')
          }}
        />
      </AppToolbar>

      {!categories.length && !categoriesLoading ? (
        <NotFoundResults
          buttonText={t('constant.buttonRequest', { name: 'categories' })}
          description={t('constant.tryAgainText', { name: 'categories' })}
          onClick={handleOpenModal}
        />
      ) : (
        <CardsList
          btnText={t('categoriesPage.viewMore')}
          cards={cards}
          isExpandable={isExpandable}
          loading={categoriesLoading}
          onClick={loadMore}
        />
      )}
    </Container>
  )
}

export default Categories
