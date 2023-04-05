import { useCallback, useMemo, useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'
import { categoryService } from '~/services/category-service'

import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

import useAxios from '~/hooks/use-axios'
import useLoadMore from '~/hooks/use-load-more'

import OfferRequestBlock from '~/containers/find-offer/OfferRequestBlock'
import ClickableCard from '~/components/clickable-card/ClickableCard'
import Loader from '~/components/loader/Loader'
import HashLink from '~/components/hash-link/HashLink'
import ClickableCardList from '~/components/clickable-card-list/ClickableCardList'
import SearchAutocomplete from '~/components/search-autocomplete/SearchAutocomplete'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import AppToolbar from '~/components/app-toolbar/AppToolbar'

import { CategoryInterface, Params } from '~/types'
import { guestRoutes } from '~/router/constants/guestRoutes'
import serviceIcon from '~/assets/img/student-home-page/service_icon.png'
import { styles } from '~/pages/categories/Categories.styles'

const Categories = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [match, setMatch] = useState('')

  const getCategoriesNames = useCallback(() => categoryService.getCategoriesNames(), [])
  const getCategories = useCallback((params: Params) => categoryService.getCategories(params), [])

  const { data, loading } = useAxios<CategoryInterface>({ service: getCategoriesNames })
  const {
    data: categories,
    loading: categoriesLoading,
    fetchData: fetchCategories,
    loadMore,
    isExpandable,
    limit
  } = useLoadMore({
    service: getCategories,
    pageSize: 12,
    fetchOnMount: false
  })

  useEffect(() => {
    fetchCategories({ limit, name: match })
  }, [fetchCategories, limit, match])

  const chooseCategory = useCallback(
    (id) => {
      return navigate(`${guestRoutes.subjects.path}?categoryId=${id}`)
    },
    [navigate]
  )

  const cards = useMemo(
    () =>
      categories.map((item: CategoryInterface) => {
        return (
          <ClickableCard
            description={ `${item.totalOffers} ${t('categoriesPage.offers')}` }
            img={ serviceIcon }
            key={ item._id }
            onClick={ () => chooseCategory(item._id) }
            title={ item.name }
          />
        )
      }),
    [categories, chooseCategory, t]
  )

  const options = useMemo(() => data.map((option: CategoryInterface) => option.name), [data])

  return (
    <Container sx={ styles.container }>
      <OfferRequestBlock />

      <TitleWithDescription
        description={ t('categoriesPage.description') }
        descriptionStyles={ styles.sectionDescription }
        title={ t('categoriesPage.title') }
        titleStyles={ styles.sectionTitle }
      />

      <Typography
        component={ HashLink } sx={ styles.showAllOffers } to={ guestRoutes.findOffers.path }
        variant='button'
      >
        { t('categoriesPage.showAllOffers') }
        <ArrowForwardIcon fontSize='small' />
      </Typography>

      <AppToolbar sx={ styles.searchToolbar }>
        <SearchAutocomplete
          loading={ loading }
          options={ options }
          search={ match }
          setSearch={ setMatch }
          textFieldProps={ {
            label: t('categoriesPage.searchLabel')
          } }
        />
      </AppToolbar>

      { categoriesLoading && !categories ? (
        <Loader size={ 70 } />
      ) : (
        <ClickableCardList
          btnText={ t('categoriesPage.viewMore') }
          cards={ cards }
          isBlur={ categoriesLoading }
          isExpandable={ isExpandable }
          onClick={ loadMore }
        />
      ) }
    </Container>
  )
}

export default Categories
