import { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

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
import { subjectService } from '../../../services/subject-service'

const ExploreSubjects = () => {
  const { t } = useTranslation()

  const [searchValue, setSearchValue] = useState('')
  const [category, setCategory] = useState(null)

  const getCategories = useCallback(() => categoryService.getCategories(), [])
  const getSubjects = useCallback(() => subjectService.getSubjects(), [])

  const { loading: categoriesLoading, response: catogoriesData } = useAxios({ service: getCategories })
  const { loading: subjectsLoading, response: subjectsData } = useAxios({ service: getSubjects })

  const categoryItems = !categoriesLoading ? catogoriesData.data.map((item) => item.name) : []
  const optionItems = !subjectsLoading ? subjectsData.data.map((item) => item.name) : []

  const onCategoryChange = (_, value) => {
    setCategory(value)
  }

  const filters = (
    <AppAutoComplete
      autocompleteStyles={ { width: '100%', maxWidth: '220px', mr: '30px' } }
      fieldValue={ category }
      label='Categories'
      onChange={ onCategoryChange }
      options={ categoryItems }
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
        label={ t('subjectsPage.subjects.searchLabel') }
        options={ optionItems }
        search={ searchValue }
        setSearch={ setSearchValue }
      />
    </Box>
  )
}

export default ExploreSubjects
