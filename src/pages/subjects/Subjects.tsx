import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import SearchAutocomplete from '~/components/search-autocomplete/SearchAutocomplete'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import NotFoundResults from '~/components/not-found-results/NotFoundResults'
import CardsList from '~/components/cards-list/CardsList'
import CardWithLink from '~/components/card-with-link/CardWithLink'
import useLoadMore from '~/hooks/use-load-more'
import { subjectService } from '~/services/subject-service'

import { useModalContext } from '~/context/modal-context'
import { categoryService } from '~/services/category-service'
import { authRoutes } from '~/router/constants/authRoutes'
import {
  CategoryNameInterface,
  SizeEnum,
  SubjectInterface,
  SubjectNameInterface
} from '~/types'
import { itemsLoadLimit } from '~/constants'
import serviceIcon from '~/assets/img/student-home-page/service_icon.png'
import DirectionLink from '~/components/direction-link/DirectionLink'
import CreateSubjectModal from '~/containers/find-offer/create-new-subject/CreateNewSubject'
import AppToolbar from '~/components/app-toolbar/AppToolbar'
import OfferRequestBlock from '~/containers/find-offer/offer-request-block/OfferRequestBlock'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'
import useSubjectsNames from '~/hooks/use-subjects-names'
import useBreakpoints from '~/hooks/use-breakpoints'
import { getScreenBasedLimit } from '~/utils/helper-functions'
import { styles } from '~/pages/subjects/Subjects.styles'

const Subjects = () => {
  const [match, setMatch] = useState<string>('')
  const [categoryName, setCategoryName] = useState<string>('')
  const params = useMemo(() => ({ name: match }), [match])

  const { t } = useTranslation()
  const breakpoints = useBreakpoints()
  const { openModal } = useModalContext()
  const [searchParams, setSearchParams] = useSearchParams()
  const categoryId = searchParams.get('categoryId') ?? ''

  const cardsLimit = getScreenBasedLimit(breakpoints, itemsLoadLimit)

  const {
    loading: subjectNamesLoading,
    response: subjectsNamesItems,
    fetchData
  } = useSubjectsNames({
    fetchOnMount: false,
    category: categoryId
  })

  const getSubjects = useCallback(
    (data?: Pick<SubjectInterface, 'name'>) =>
      subjectService.getSubjects(data, categoryId),
    [categoryId]
  )

  const {
    data: subjects,
    loading: subjectsLoading,
    resetData,
    loadMore,
    isExpandable
  } = useLoadMore<SubjectInterface, Pick<SubjectInterface, 'name'>>({
    service: getSubjects,
    limit: cardsLimit,
    params
  })

  const cards = useMemo(
    () =>
      subjects.map((item: SubjectInterface) => {
        return (
          <CardWithLink
            description={`${item.totalOffers} ${t('categoriesPage.offers')}`}
            img={serviceIcon}
            key={item._id}
            link={`${authRoutes.findOffers.path}?categoryId=${categoryId}&subjectId=${item._id}`}
            title={item.name}
          />
        )
      }),
    [subjects, categoryId, t]
  )

  const onCategoryChange = (
    _: React.SyntheticEvent,
    value: CategoryNameInterface | null
  ) => {
    searchParams.set('categoryId', value?._id ?? '')
    setCategoryName(value?.name ?? '')
    setSearchParams(searchParams)
    resetData()
  }

  const onResponseCategory = (response: CategoryNameInterface[]) => {
    const category = response.find((option) => option._id === categoryId)
    setCategoryName(category?.name ?? '')
  }

  const autoCompleteCategories = (
    <AsyncAutocomplete
      axiosProps={{ onResponse: onResponseCategory }}
      labelField='name'
      onChange={onCategoryChange}
      service={categoryService.getCategoriesNames}
      sx={styles.categoryInput}
      textFieldProps={{
        label: t('breadCrumbs.categories')
      }}
      value={categoryId}
      valueField='_id'
    />
  )

  const options = useMemo(
    () => subjectsNamesItems.map((option: SubjectNameInterface) => option.name),
    [subjectsNamesItems]
  )

  const getSubjectNames = () => !subjectsNamesItems.length && void fetchData()

  const handleOpenModal = () => openModal({ component: <CreateSubjectModal /> })

  return (
    <Container sx={styles.container}>
      <OfferRequestBlock />
      <TitleWithDescription
        description={t('subjectsPage.subjects.description')}
        style={styles.titleWithDescription}
        title={t('subjectsPage.subjects.title', {
          category: categoryName
        })}
      />

      <Box sx={styles.navigation}>
        <DirectionLink
          before={<ArrowBackIcon fontSize={SizeEnum.Small} />}
          linkTo={authRoutes.categories.path}
          title={t('subjectsPage.subjects.backToAllCategories')}
        />
        <DirectionLink
          after={<ArrowForwardIcon fontSize={SizeEnum.Small} />}
          linkTo={authRoutes.findOffers.path}
          title={t('subjectsPage.subjects.showAllOffers')}
        />
      </Box>
      <AppToolbar sx={styles.searchToolbar}>
        {!breakpoints.isMobile && autoCompleteCategories}
        <SearchAutocomplete
          loading={subjectNamesLoading}
          onFocus={getSubjectNames}
          onSearchChange={resetData}
          options={options}
          search={match}
          setSearch={setMatch}
          textFieldProps={{
            label: t('subjectsPage.subjects.searchLabel')
          }}
        />
      </AppToolbar>
      {breakpoints.isMobile && autoCompleteCategories}
      {!subjects.length && !subjectsLoading ? (
        <NotFoundResults
          buttonText={t('constant.buttonRequest', { name: 'subjects' })}
          description={t('constant.tryAgainText', { name: 'subjects' })}
          onClick={handleOpenModal}
        />
      ) : (
        <CardsList
          btnText={t('categoriesPage.viewMore')}
          cards={cards}
          isExpandable={isExpandable}
          loading={subjectsLoading}
          onClick={loadMore}
        />
      )}
    </Container>
  )
}

export default Subjects
