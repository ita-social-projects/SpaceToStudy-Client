import { Dispatch, SetStateAction, useMemo } from 'react'

import { useSearchParams } from 'react-router-dom'
import useCategoriesNames from '~/hooks/use-categories-names'
import useSubjectsNames from '~/hooks/use-subjects-names'
import { useTranslation } from 'react-i18next'

import SearchFilterInput from '~/components/search-filter-input/SearchFilterInput'
import AppToolbar from '~/components/app-toolbar/AppToolbar'
import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'

import { CategoryNameInterface, SubjectNameInterface } from '~/types'

import { styles } from '~/containers/find-offer/offer-search-toolbar/OfferSearchToolbar.styles'

interface OfferSearchToolbarProps {
  search: string
  setSearch: Dispatch<SetStateAction<string>>
}

const OfferSearchToolbar = ({ search, setSearch }: OfferSearchToolbarProps) => {
  const { t } = useTranslation()

  const [searchParams, setSearchParams] = useSearchParams()
  const categoryId = searchParams.get('categoryId')
  const subjectId = searchParams.get('subjectId')

  const { loading: categoriesNamesLoading, response: categoriesNamesItems } =
    useCategoriesNames({})

  const { loading: subjectsNamesLoading, response: subjectsNamesItems } =
    useSubjectsNames({
      category: categoryId
    })

  const category = useMemo(
    () =>
      categoriesNamesItems.find((option) => option._id === categoryId) || null,
    [categoriesNamesItems, categoryId]
  )
  const subject = useMemo(
    () => subjectsNamesItems.find((option) => option._id === subjectId) || null,
    [subjectsNamesItems, subjectId]
  )

  const onCategoryChange = (
    _: React.ChangeEvent,
    value: CategoryNameInterface | null
  ) => {
    searchParams.set('categoryId', value?._id || '')
    setSearchParams(searchParams)
  }

  const onSubjectChange = (
    _: React.ChangeEvent,
    value: SubjectNameInterface | null
  ) => {
    searchParams.set('subjectId', value?._id || '')
    setSearchParams(searchParams)
  }

  const getOptionLabel = (
    option: CategoryNameInterface | SubjectNameInterface
  ) => option.name || ''
  const isOptionEqualToValue = (
    option: CategoryNameInterface | SubjectNameInterface,
    value: CategoryNameInterface | SubjectNameInterface
  ) => option?._id === value?._id

  return (
    <AppToolbar sx={styles.searchToolbar}>
      <AppAutoComplete
        getOptionLabel={getOptionLabel}
        isOptionEqualToValue={isOptionEqualToValue}
        loading={categoriesNamesLoading}
        onChange={onCategoryChange}
        options={categoriesNamesItems}
        sx={styles.autocomplete}
        textFieldProps={{
          label: t('breadCrumbs.categories')
        }}
        value={category}
      />
      <AppAutoComplete
        getOptionLabel={getOptionLabel}
        isOptionEqualToValue={isOptionEqualToValue}
        loading={subjectsNamesLoading}
        onChange={onSubjectChange}
        options={subjectsNamesItems}
        sx={styles.autocomplete}
        textFieldProps={{
          label: t('breadCrumbs.subjects')
        }}
        value={subject}
      />
      <SearchFilterInput
        search={search}
        setSearch={setSearch}
        textFieldProps={{
          label: t('findOffers.searchToolbar.label')
        }}
      />
    </AppToolbar>
  )
}

export default OfferSearchToolbar
