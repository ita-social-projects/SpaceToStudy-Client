import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

import SearchWithFilters from '~/components/search-with-filters/SearchWithFilters'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'

import { styles } from '~/pages/subjects/Subjects.styles'
import { guestRoutes } from '~/router/constants/guestRoutes'
import useCategories from '~/hooks/use-categories'
import useSubjects from '~/hooks/use-subjects'
import { CategoryInterface } from '~/types'
import DirectionLink from '~/components/direction-link/DirectionLink'
import AppToolbar from '~/components/app-toolbar/AppToolbar'

const Subjects = () => {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const categoryId = searchParams.get('categoryId')

  const { categoriesNamesLoading, categoriesNamesItems } = useCategories({
    fetchOnMount: { categories: false, categoriesNames: true }
  })

  const [searchValue, setSearchValue] = useState<string>('')
  const [category, setCategory] = useState<Pick<CategoryInterface, '_id' | 'name'> | null>(null)

  useEffect(() => {
    if (!category && categoryId && !categoriesNamesLoading) {
      const categoryOption = categoriesNamesItems.find((option) => option._id === categoryId)
      categoryOption && setCategory(categoryOption)
    }
  }, [categoriesNamesLoading, categoryId, categoriesNamesItems, category])

  const { subjectsNamesItems } = useSubjects({
    category: '6421ed8ed991d46a84721dfa',
    fetchOnMount: {
      subjects: true,
      subjectsNames: true
    }
  })

  const onCategoryChange = (_: React.ChangeEvent, value: Pick<CategoryInterface, '_id' | 'name'> | null) => {
    searchParams.set('categoryId', value?._id || '')
    setSearchParams(searchParams)
    setCategory(value)
  }

  const optionsSubjects = subjectsNamesItems.map((item) => item.name)

  return (
    <Box sx={ { backgroundColor: 'backgroundColor', flex: 1 } }>
      <Container>
        <Box className='section' sx={ styles.container }>
          <TitleWithDescription
            description={ t('subjectsPage.subjects.description') }
            descriptionStyles={ styles.sectionDescription }
            title={ t('subjectsPage.subjects.title', { category: category?.name }) }
            titleStyles={ styles.sectionTitle }
          />

          <Box sx={ styles.navigation }>
            <DirectionLink
              directionArray='before'
              linkTo={ guestRoutes.categories.path }
              title={ t('subjectsPage.subjects.backToAllCategories') }
            />

            <DirectionLink
              directionArray='after'
              linkTo={ guestRoutes.findOffers.path }
              title={ t('subjectsPage.subjects.showAllOffers') }
            />
          </Box>
          <AppToolbar sx={ styles.searchToolbar }>
            <AppAutoComplete
              getOptionLabel={ (option: Pick<CategoryInterface, 'name'>) => option?.name || '' }
              isOptionEqualToValue={ (option: Pick<CategoryInterface, '_id'>, value: Pick<CategoryInterface, '_id'>) =>
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
            <SearchWithFilters
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
    </Box>
  )
}

export default Subjects
