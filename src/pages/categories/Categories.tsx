import { useCallback, useMemo, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { categoryService } from '~/services/category-service'

import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

import useAxios from '~/hooks/use-axios'
import useLoadMore from '~/hooks/use-load-more'

import OfferRequestBlock from '~/containers/find-offer/OfferRequestBlock'
import ClickableCard from '~/components/clickable-card/ClickableCard'
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
  const [match, setMatch] = useState<string>('')

  const getCategoriesNames = useCallback(() => categoryService.getCategoriesNames(), [])
  const getCategories = useCallback((params: Params) => categoryService.getCategories(params), [])

  const { response, loading } = useAxios({ service: getCategoriesNames, defaultResponse: [] })
  const {
    data: categories,
    loading: categoriesLoading,
    fetchData: fetchCategories,
    resetData,
    loadMore,
    isExpandable,
    limit,
    skip
  } = useLoadMore<CategoryInterface>({
    service: getCategories,
    limit: 12,
    fetchOnMount: false
  })

  useEffect(() => {
    fetchCategories({ limit, name: match, skip })
  }, [fetchCategories, limit, match, skip])

  const cards = useMemo(
    () =>
      categories.map((item: CategoryInterface) => {
        return (
          <ClickableCard
            description={ `${item.totalOffers} ${t('categoriesPage.offers')}` }
            img={ serviceIcon }
            key={ item._id }
            link={ `${guestRoutes.subjects.path}?categoryId=${item._id}` }
            title={ item.name }
          />
        )
      }),
    [categories, t]
  )

  const options = useMemo(() => response.map((option: CategoryInterface) => option.name), [response])

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
          resetData={ resetData }
          search={ match }
          setSearch={ setMatch }
          textFieldProps={ {
            label: t('categoriesPage.searchLabel')
          } }
        />
      </AppToolbar>

      <ClickableCardList
        btnText={ t('categoriesPage.viewMore') }
        cards={ cards }
        isExpandable={ isExpandable }
        loading={ categoriesLoading }
        onClick={ loadMore }
      />
    </Container>
  )
}

export default Categories
