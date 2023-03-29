import { useCallback, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { categoryService } from '~/services/category-service'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

import useAxios from '~/hooks/use-axios'
import useShowMore from '~/hooks/use-show-more'

import ClickableCard from '~/components/clickable-card/ClickableCard'
import Loader from '~/components/loader/Loader'
import HashLink from '~/components/hash-link/HashLink'
import ClickableCardList from '~/components/clickable-card-list/ClickableCardList'
import SearchWithFilters from '~/components/search-with-filters/SearchWithFilters'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

import { CategoryInterface } from '~/types'
import serviceIcon from '~/assets/img/student-home-page/service_icon.png'
import { styles } from '~/containers/categories-page/explore-categories/ExploreCategories.styles'

const ExploreCategories = () => {
  const { t } = useTranslation()
  const [match, setMatch] = useState('')
  const [limit, setLimit] = useState(12)

  const getCategoriesNames = useCallback(() => categoryService.getCategoriesNames(), [])
  const getCategories = useCallback(() => categoryService.getCategories({ match, limit }), [match, limit])

  const { response, loading, fetchData } = useAxios({ service: getCategoriesNames })
  const { response: categories, loading: categoriesLoading } = useAxios({ service: getCategories })
  const { isExpandable, showMore } = useShowMore<CategoryInterface[]>(limit, 5, setLimit, categoriesLoading, categories)

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const cards =
    categories &&
    categories.data.map((item: CategoryInterface) => {
      return (
        <ClickableCard
          description={ `${item.totalOffers} ${t('categoriesPage.offers')}` }
          img={ serviceIcon }
          key={ item._id }
          onClick={ () => null }
          title={ item.name }
        />
      )
    })

  return (
    <Box sx={ styles.container }>
      <TitleWithDescription
        description={ t('categoriesPage.description') }
        descriptionStyles={ styles.sectionDescription }
        title={ t('categoriesPage.title') }
        titleStyles={ styles.sectionTitle }
      />

      <Typography
        component={ HashLink } sx={ styles.showAllOffers } to={ '#' }
        variant='button'
      >
        { t('categoriesPage.showAllOffers') }
        <ArrowForwardIcon fontSize='small' />
      </Typography>

      <SearchWithFilters
        loading={ loading }
        options={ !loading && response.data }
        search={ match }
        setSearch={ setMatch }
        textFieldProps={ {
          label: t('categoriesPage.searchLabel')
        } }
      />

      { categoriesLoading && !categories ? (
        <Loader size={ 70 } />
      ) : (
        <ClickableCardList
          btnText={ t('categoriesPage.viewMore') }
          cards={ cards }
          isBlur={ categoriesLoading }
          isExpandable={ isExpandable }
          onClick={ showMore }
        />
      ) }
    </Box>
  )
}

export default ExploreCategories
