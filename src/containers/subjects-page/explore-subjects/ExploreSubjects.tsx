import { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import useAxios from '~/hooks/use-axios'
import HashLink from '~/components/hash-link/HashLink'
import SearchWithFilters from '~/components/search-with-filters/SearchWithFilters'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'

import { styles } from '~/containers/subjects-page/explore-subjects/ExploreSubjects.styles'
import { guestRoutes } from '~/router/constants/guestRoutes'
import { categoryService } from '~/services/category-service'
import { subjectService } from '~/services/subject-service'
import { CategoryInterface, SubjectInterface } from '~/types'

const ExploreSubjects = () => {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const categoryId = searchParams.get('catId')
  const categoryIdConvertType = categoryId === 'null' ? null : categoryId

  const [searchValue, setSearchValue] = useState<string>('')
  const [category, setCategory] = useState<string | null>(categoryIdConvertType)

  const getCategories = useCallback(() => categoryService.getCategories(), [])
  const getSubjects = useCallback(() => subjectService.getSubjects(), [])

  const { loading: categoriesLoading, response: catogoriesData } = useAxios<CategoryInterface[]>({
    service: getCategories
  })
  const { loading: subjectsLoading, response: subjectsData } = useAxios<SubjectInterface[]>({ service: getSubjects })

  const categoryItems = !categoriesLoading
    ? catogoriesData.data.map((item: Pick<CategoryInterface, 'name'>) => item.name)
    : []
  const optionItems = !subjectsLoading ? subjectsData.data.map((item: Pick<SubjectInterface, 'name'>) => item.name) : []

  const onCategoryChange = (_: React.ChangeEvent, value: string | null) => {
    setCategory(value)
    setSearchParams({ catId: value?.toString() ?? 'null' })
  }

  const filters = (
    <AppAutoComplete
      onChange={ onCategoryChange }
      options={ categoryItems }
      sx={ styles.categoryInput }
      textFieldProps={ {
        label: t('breadCrumbs.categories')
      } }
      value={ category }
    />
  )

  return (
    <Box className='section' sx={ styles.container }>
      <TitleWithDescription
        description={ t('subjectsPage.subjects.description') }
        descriptionStyles={ styles.sectionDescription }
        title={ t('subjectsPage.subjects.title', { category }) }
        titleStyles={ styles.sectionTitle }
      />

      <Box sx={ styles.navigation }>
        <Typography
          component={ HashLink } sx={ styles.showAllOffers } to={ guestRoutes.categories.path }
          variant='button'
        >
          <ArrowBackIcon fontSize='small' />
          { t('subjectsPage.subjects.backToAllCategories') }
        </Typography>

        <Typography
          component={ HashLink } sx={ styles.showAllOffers } to={ guestRoutes.findOffers.path }
          variant='button'
        >
          { t('subjectsPage.subjects.showAllOffers') }
          <ArrowForwardIcon fontSize='small' />
        </Typography>
      </Box>

      <SearchWithFilters
        filters={ filters }
        options={ optionItems }
        search={ searchValue }
        setSearch={ setSearchValue }
        textFieldProps={ {
          label: t('subjectsPage.subjects.searchLabel')
        } }
      />
    </Box>
  )
}

export default ExploreSubjects
