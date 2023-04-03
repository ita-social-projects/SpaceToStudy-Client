import { useEffect, useState } from 'react'
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
import { CategoryInterface } from '~/types'
import DirectionLink from '~/components/direction-link/DirectionLink'
import AppToolbar from '~/components/app-toolbar/AppToolbar'
import useCategoriesNames from '~/hooks/use-categories-names'
import useSubjectsNames from '~/hooks/use-subjects-names'

const Subjects = () => {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const categoryId = searchParams.get('categoryId')

  const { loading: categoriesNamesLoading, responseItems: categoriesNamesItems } = useCategoriesNames({})

  const [searchValue, setSearchValue] = useState<string>('')
  const [category, setCategory] = useState<Partial<CategoryInterface> | null>(null)

  useEffect(() => {
    if (!category && categoryId && !categoriesNamesLoading) {
      const categoryOption = categoriesNamesItems.find((option) => option._id === categoryId)
      categoryOption && setCategory(categoryOption)
    }
  }, [categoriesNamesLoading, categoryId, categoriesNamesItems, category])

  const { responseItems: subjectsNamesItems } = useSubjectsNames({
    category: category?._id
  })

  const onCategoryChange = (_: React.ChangeEvent, value: Partial<CategoryInterface> | null) => {
    searchParams.set('categoryId', value?._id || '')
    setSearchParams(searchParams)
    setCategory(value)
  }

  const optionsSubjects = subjectsNamesItems.map((item) => item.name)

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
            getOptionLabel={ (option: Partial<CategoryInterface>) => option.name || '' }
            isOptionEqualToValue={ (option: Partial<CategoryInterface>, value: Partial<CategoryInterface>) =>
              option?._id === value?._id
            }
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
            options={ optionsSubjects }
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
