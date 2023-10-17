import { useState, ChangeEvent, useMemo, Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import SimpleBar from 'simplebar-react'
import Box from '@mui/material/Box'
import Menu, { MenuProps } from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { PopoverOrigin } from '@mui/material/Popover'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import ClearIcon from '@mui/icons-material/Clear'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

import useAxios from '~/hooks/use-axios'
import Loader from '~/components/loader/Loader'
import InputWithIcon from '~/components/input-with-icon/InputWithIcon'

import { defaultResponses } from '~/constants'
import { styles } from '~/components/filter-selector/FilterSelector.styles'
import { ServiceFunction } from '~/types'

interface FilterSelectorProps<T> extends Omit<MenuProps, 'open'> {
  title: string
  service: ServiceFunction<T[]>
  selectedItems: string[]
  setSelectedItems: Dispatch<SetStateAction<string[]>>
  position?: PopoverOrigin['horizontal']
  valueField?: keyof T
}

const FilterSelector = <T,>({
  title,
  service,
  selectedItems,
  setSelectedItems,
  position = 'left',
  valueField,
  ...props
}: FilterSelectorProps<T>) => {
  const { t } = useTranslation()
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null)
  const [inputValue, setInputValue] = useState<string>('')

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleInputReset = () => {
    setInputValue('')
  }

  const handleMenuOpen = () => {
    setMenuAnchor(document.getElementById('menu-filter'))
  }

  const handleMenuClose = () => {
    setMenuAnchor(null)
  }

  const onMenuItemClick = (item: string) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((selected) => selected !== item))
    } else {
      setSelectedItems([...selectedItems, item])
    }
  }

  const onClearAll = () => {
    selectedItems.length && setSelectedItems([])
  }

  const { loading, response } = useAxios<T[]>({
    service: service,
    defaultResponse: defaultResponses.array
  })

  const filteredItems = useMemo(
    () =>
      response.filter((item: T) =>
        String(valueField ? item[valueField] : item)
          .toLowerCase()
          .includes(inputValue.toLowerCase())
      ),
    [response, inputValue, valueField]
  )

  const menuItems: JSX.Element[] = filteredItems.map((item: T) => {
    const field = String(valueField ? item[valueField] : item)

    return (
      <MenuItem
        key={field}
        onClick={() => onMenuItemClick(field)}
        sx={styles.text}
      >
        <Checkbox checked={selectedItems.includes(field)} />
        {field}
      </MenuItem>
    )
  })

  const scrollableContent = filteredItems.length ? (
    menuItems
  ) : (
    <Box sx={styles.noMatches}>
      <ErrorOutlineIcon sx={styles.noItemsIcon} />
      {t('common.noItems')}
    </Box>
  )

  const itemsLoad = !response.length && loading
  const chosenFiltersText = selectedItems.length
    ? selectedItems.join(', ')
    : t('cooperationsPage.tabs.all')

  return (
    <Box id='menu-filter' sx={styles.root}>
      <Typography sx={styles.text}>{title}:</Typography>
      <Typography sx={styles.chosenFilters}>{chosenFiltersText}</Typography>
      <IconButton
        disableRipple
        onClick={handleMenuOpen}
        sx={styles.openMenuBtn}
      >
        <KeyboardArrowDownIcon sx={styles.arrowIcon(!!menuAnchor)} />
      </IconButton>

      <Menu
        PaperProps={styles.menuPaperProps}
        anchorEl={menuAnchor}
        anchorOrigin={{ vertical: 'bottom', horizontal: position }}
        onClose={handleMenuClose}
        open={!!menuAnchor}
        sx={styles.menu(itemsLoad)}
        transformOrigin={{ vertical: 'top', horizontal: position }}
        {...props}
      >
        <Box sx={styles.inputWrapper}>
          <InputWithIcon
            onChange={handleInputChange}
            onClear={handleInputReset}
            placeholder={t('common.search')}
            sx={styles.input}
            value={inputValue}
          />
        </Box>

        <Typography
          onClick={onClearAll}
          sx={styles.clearAll(!!selectedItems.length)}
        >
          <ClearIcon sx={styles.clearIcon} />
          {t('header.notifications.clearAll')}
        </Typography>

        <Divider sx={styles.divider} />

        <SimpleBar style={styles.scrollableContent}>
          {itemsLoad ? (
            <Loader pageLoad size={20} sx={styles.loader} />
          ) : (
            scrollableContent
          )}
        </SimpleBar>
      </Menu>
    </Box>
  )
}

export default FilterSelector
