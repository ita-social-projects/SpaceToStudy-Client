import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

import { categoryService } from '~/services/category-service'
import { useModalContext } from '~/context/modal-context'
import useLoadMore from '~/hooks/use-load-more'
import useCategoriesNames from '~/hooks/use-categories-names'
import useBreakpoints from '~/hooks/use-breakpoints'
import { useAppSelector } from '~/hooks/use-redux'

import PageWrapper from '~/components/page-wrapper/PageWrapper'
import OfferRequestBlock from '~/containers/find-offer/offer-request-block/OfferRequestBlock'
import CardWithLink from '~/components/card-with-link/CardWithLink'
import CardsList from '~/components/cards-list/CardsList'
import SearchAutocomplete from '~/components/search-autocomplete/SearchAutocomplete'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import AppToolbar from '~/components/app-toolbar/AppToolbar'
import DirectionLink from '~/components/direction-link/DirectionLink'
import NotFoundResults from '~/components/not-found-results/NotFoundResults'
import CreateSubjectModal from '~/containers/find-offer/create-new-subject/CreateNewSubject'
import { getOpositeRole, getScreenBasedLimit } from '~/utils/helper-functions'
import { getSuffixes } from '~/utils/get-translation-suffixes'

import {
  CategoryInterface,
  CategoryNameInterface,
  CategoriesParams,
  SizeEnum
} from '~/types'
import { itemsLoadLimit } from './Categories.constants'
import { authRoutes } from '~/router/constants/authRoutes'
import { styles } from '~/pages/categories/Categories.styles'

const Categories = () => {
  const { t, i18n } = useTranslation()
  const nameOfSearchContent = t('categoriesPage.category')
  const { suffix } = getSuffixes(nameOfSearchContent, i18n.language)
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
            description={t('categoriesPage.offerCount', {
              count: item.totalOffers[oppositeRole]
            })}
            icon={item.appearance.icon}
            iconColor={item.appearance.color}
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
    <PageWrapper>
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
          buttonText={t('errorMessages.buttonRequest', {
            name: nameOfSearchContent,
            suffix
          })}
          description={t('errorMessages.tryAgainText', {
            name: nameOfSearchContent,
            suffix
          })}
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
    </PageWrapper>
  )
}

export default Categories
