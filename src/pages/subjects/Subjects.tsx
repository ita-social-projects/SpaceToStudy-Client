import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import SearchAutocomplete from '~/components/search-autocomplete/SearchAutocomplete'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'

import { styles } from '~/pages/subjects/Subjects.styles'
import { guestRoutes } from '~/router/constants/guestRoutes'
import { CategoryNameInterface } from '~/types'
import DirectionLink from '~/components/direction-link/DirectionLink'
import AppToolbar from '~/components/app-toolbar/AppToolbar'
import useCategoriesNames from '~/hooks/use-categories-names'
import useSubjectsNames from '~/hooks/use-subjects-names'

const Subjects = () => {
  const [searchValue, setSearchValue] = useState<string>('')

  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const categoryId = searchParams.get('categoryId')

  const { loading: categoriesNamesLoading, response: categoriesNamesItems } = useCategoriesNames({})
  const { response: subjectsNamesItems } = useSubjectsNames({
    category: categoryId
  })

  const category = useMemo(
    () => categoriesNamesItems.find((option) => option._id === categoryId) || null,
    [categoriesNamesItems, categoryId]
  )

  const onCategoryChange = (_: React.ChangeEvent, value: CategoryNameInterface | null) => {
    searchParams.set('categoryId', value?._id || '')
    setSearchParams(searchParams)
  }

  const getOptionLabelCategory = (option: CategoryNameInterface) => option.name || ''
  const isOptionEqualToValueCategory = (option: CategoryNameInterface, value: CategoryNameInterface) =>
    option?._id === value?._id

  return (
    <Container sx={ { flex: 1 } }>
      <Box className='section' sx={ styles.container }>
        <TitleWithDescription
          description={ t('subjectsPage.subjects.description') }
          descriptionStyles={ styles.sectionDescription }
          title={ t('subjectsPage.subjects.title', { category: category?.name }) }
          titleStyles={ styles.sectionTitle }
        />

        <Box sx={ styles.navigation }>
          <DirectionLink
            before={ <ArrowBackIcon fontSize='small' /> }
            linkTo={ guestRoutes.categories.path }
            title={ t('subjectsPage.subjects.backToAllCategories') }
          />

          <DirectionLink
            after={ <ArrowForwardIcon fontSize='small' /> }
            linkTo={ guestRoutes.findOffers.path }
            title={ t('subjectsPage.subjects.showAllOffers') }
          />
        </Box>
        <AppToolbar sx={ styles.searchToolbar }>
          <AppAutoComplete
            getOptionLabel={ getOptionLabelCategory }
            isOptionEqualToValue={ isOptionEqualToValueCategory }
            loading={ categoriesNamesLoading }
            onChange={ onCategoryChange }
            options={ categoriesNamesItems }
            sx={ styles.categoryInput }
            textFieldProps={ {
              label: t('breadCrumbs.categories')
            } }
            value={ category }
          />
          <SearchAutocomplete
            options={ subjectsNamesItems }
            search={ searchValue }
            setSearch={ setSearchValue }
            textFieldProps={ {
              label: t('subjectsPage.subjects.searchLabel')
            } }
          />
        </AppToolbar>
      </Box>
    </Container>
  )
}

export default Subjects
