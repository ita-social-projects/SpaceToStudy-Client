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

import { ResourceService } from '~/services/resource-service'
import { useDebounce } from '~/hooks/use-debounce'
import { SortHook } from '~/hooks/table/use-sort'
import useBreakpoints from '~/hooks/use-breakpoints'
import AppButton from '~/components/app-button/AppButton'
import InputWithIcon from '~/components/input-with-icon/InputWithIcon'
import AppButtonMenu from '~/components/app-button-menu/AppButtonMenu'
import ResourcesToolBarDrawer from '~/containers/my-resources/resources-toolbar-drawer/ResourcesToolbarDrawer'

import { styles } from '~/containers/my-resources/add-resource-with-input/AddResourceWithInput.styles'
import { CategoryNameInterface, PositionEnum, SizeEnum } from '~/types'

interface AddResourceWithInputProps {
  btnText?: string
  fetchData: () => Promise<void>
  link?: string
  searchRef: MutableRefObject<string>
  button?: ReactElement
  selectedItems?: string[]
  setItems?: Dispatch<SetStateAction<string[]>>
  sortOptions?: SortHook
  placeholder: string
}

const AddResourceWithInput: FC<AddResourceWithInputProps> = ({
  btnText,
  fetchData,
  link,
  searchRef,
  button,
  selectedItems,
  setItems,
  sortOptions,
  placeholder
}) => {
  const { t } = useTranslation()
  const { isMobile, isTablet } = useBreakpoints()
  const [searchInput, setSearchInput] = useState<string>('')

  const isMobileOrTablet = isMobile || isTablet
  const { Medium, Large } = SizeEnum

  const onSearchChange = (text: string) => {
    searchRef.current = text
  }

  const debounceOnChange = useDebounce((text: string) => {
    onSearchChange(text)
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

  const filterWithInput = (
    <>
      {selectedItems && setItems && (
        <AppButtonMenu<CategoryNameInterface>
          customSx={{
            root: {
              borderRadius: '100px !important'
            }
          }}
          position={PositionEnum.Right}
          selectedItems={selectedItems}
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
        placeholder={t(placeholder)}
        sx={styles.input}
        value={searchInput}
      />
    </>
  )

  return (
    <Box sx={styles.container}>
      {!button ? (
        <AppButton
          component={Link}
          size={isMobileOrTablet ? Medium : Large}
          to={link}
        >
          {btnText && t(btnText)}
          <AddIcon sx={styles.addIcon} />
        </AppButton>
      ) : (
        button
      )}

      {isMobileOrTablet && setItems && sortOptions ? (
        <ResourcesToolBarDrawer
          isMobile={isMobile}
          setCategories={setItems}
          setSearch={onSearchChange}
          sortOptions={sortOptions}
        />
      ) : (
        <Box sx={styles.filterWithInput}>{filterWithInput}</Box>
      )}
    </Box>
  )
}

export default AddResourceWithInput
