import {
  useState,
  ChangeEvent,
  FC,
  MutableRefObject,
  ReactElement,
  Dispatch,
  SetStateAction
} from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import Box from '@mui/material/Box'

import { useDebounce } from '~/hooks/use-debounce'
import AppButton from '~/components/app-button/AppButton'
import InputWithIcon from '~/components/input-with-icon/InputWithIcon'
import FilterSelector from '~/components/filter-selector/FilterSelector'

import { styles } from '~/containers/my-resources/add-resource-with-input/AddResourceWithInput.styles'
import { CategoryNameInterface } from '~/types'
import { ResourceService } from '~/services/resource-service'

interface AddResourceWithInputProps {
  btnText?: string
  fetchData: () => Promise<void>
  link?: string
  searchRef: MutableRefObject<string>
  button?: ReactElement
  selectedItems?: string[]
  setItems?: Dispatch<SetStateAction<string[]>>
}

const AddResourceWithInput: FC<AddResourceWithInputProps> = ({
  btnText,
  fetchData,
  link,
  searchRef,
  button,
  selectedItems,
  setItems
}) => {
  const { t } = useTranslation()
  const [searchInput, setSearchInput] = useState<string>('')

  const debounceOnChange = useDebounce((text: string) => {
    searchRef.current = text
    void fetchData()
  })

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
    debounceOnChange(e.target.value)
  }

  const onClear = () => {
    setSearchInput('')
    searchRef.current = ''
    void fetchData()
  }

  return (
    <Box sx={styles.container}>
      {!button ? (
        <AppButton component={Link} to={link}>
          {!button && btnText && t(btnText)}
          <AddIcon sx={styles.addIcon} />
        </AppButton>
      ) : (
        button
      )}
      <Box sx={styles.filterWithInput}>
        {selectedItems && setItems && (
          <FilterSelector<CategoryNameInterface>
            position={'right'}
            selectedItems={selectedItems ?? []}
            service={ResourceService.getResourcesCategoriesNames}
            setSelectedItems={setItems}
            showNoneProperty
            title={t('myResourcesPage.categories.category')}
            valueField={'name'}
          />
        )}
        <InputWithIcon
          endAdornment={<SearchIcon sx={styles.searchIcon} />}
          onChange={onChange}
          onClear={onClear}
          placeholder={t('common.search')}
          sx={styles.input}
          value={searchInput}
        />
      </Box>
    </Box>
  )
}

export default AddResourceWithInput
