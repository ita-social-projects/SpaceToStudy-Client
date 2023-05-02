import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import SearchAutocomplete from '~/components/search-autocomplete/SearchAutocomplete'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

import { categoryService } from '~/services/category-service'
import { authRoutes } from '~/router/constants/authRoutes'
import DirectionLink from '~/components/direction-link/DirectionLink'
import AppToolbar from '~/components/app-toolbar/AppToolbar'
import OfferRequestBlock from '~/containers/find-offer/OfferRequestBlock'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'
import useSubjectsNames from '~/hooks/use-subjects-names'
import useBreakpoints from '~/hooks/use-breakpoints'
import { CategoryNameInterface, SubjectNameInterface } from '~/types'
import { mapArrayByField } from '~/utils/map-array-by-field'
import { styles } from '~/pages/subjects/Subjects.styles'

const Subjects = () => {
  const [searchValue, setSearchValue] = useState<string>('')
  const [categoryName, setCategoryName] = useState<string>('')
  const { t } = useTranslation()
  const { isMobile } = useBreakpoints()
  const [searchParams, setSearchParams] = useSearchParams()
  const categoryId = searchParams.get('categoryId')

  const transform = useCallback(
    (data: SubjectNameInterface[]): string[] => mapArrayByField(data, 'name'),
    []
  )

  const { response: subjectsNamesItems } = useSubjectsNames({
    category: categoryId,
    transform
  })

  const onCategoryChange = (
    _: React.SyntheticEvent,
    value: CategoryNameInterface | null
  ) => {
    searchParams.set('categoryId', value?._id ?? '')
    setCategoryName(value?.name ?? '')
    setSearchParams(searchParams)
  }

  const autoCompleteCategories = (
    <AsyncAutocomplete
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

  return (
    <Container sx={{ flex: 1, mt: '80px' }}>
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
          before={<ArrowBackIcon fontSize='small' />}
          linkTo={authRoutes.categories.path}
          title={t('subjectsPage.subjects.backToAllCategories')}
        />
        <DirectionLink
          after={<ArrowForwardIcon fontSize='small' />}
          linkTo={authRoutes.findOffers.path}
          title={t('subjectsPage.subjects.showAllOffers')}
        />
      </Box>
      <AppToolbar sx={styles.searchToolbar}>
        {!isMobile && autoCompleteCategories}
        <SearchAutocomplete
          options={subjectsNamesItems}
          search={searchValue}
          setSearch={setSearchValue}
          textFieldProps={{
            label: t('subjectsPage.subjects.searchLabel')
          }}
        />
      </AppToolbar>
      {isMobile && autoCompleteCategories}
    </Container>
  )
}

export default Subjects
