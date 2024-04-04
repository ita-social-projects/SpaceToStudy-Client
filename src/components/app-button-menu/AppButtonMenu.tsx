import { useState, ChangeEvent, useMemo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import SimpleBar from 'simplebar-react'
import { SxProps } from '@mui/material'
import Box from '@mui/material/Box'
import { MenuProps } from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { PopoverOrigin } from '@mui/material/Popover'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import ClearIcon from '@mui/icons-material/Clear'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

import useAxios from '~/hooks/use-axios'
import useMenu from '~/hooks/use-menu'
import Loader from '~/components/loader/Loader'
import AppButton from '~/components/app-button/AppButton'
import InputWithIcon from '~/components/input-with-icon/InputWithIcon'

import { defaultResponses } from '~/constants'
import { spliceSx } from '~/utils/helper-functions'
import { styles } from '~/components/app-button-menu/AppButtonMenu.styles'
import {
  ButtonVariantEnum,
  CategoryNameInterface,
  ServiceFunction
} from '~/types'

interface AppButtonMenuProps<T> extends Omit<MenuProps, 'open'> {
  title: string
  service: ServiceFunction<T[]>
  selectedItems: string[]
  setSelectedItems: (value: string[]) => void
  position?: PopoverOrigin['horizontal']
  valueField?: keyof T
  showNoneProperty?: boolean
  customSx?: { root?: SxProps }
}

const AppButtonMenu = <T extends Pick<CategoryNameInterface, '_id'>>({
  title,
  service,
  selectedItems,
  setSelectedItems,
  position = 'left',
  valueField,
  showNoneProperty = false,
  customSx,
  ...props
}: AppButtonMenuProps<T>) => {
  const { t } = useTranslation()
  const [inputValue, setInputValue] = useState<string>('')
  const [selectedNames, setSelectedNames] = useState<string[]>([])
  const { anchorEl, openMenu, renderMenu } = useMenu()

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleInputReset = () => {
    setInputValue('')
  }

  const onMenuItemClick = (item: string, id: string) => {
    if (selectedNames.includes(item)) {
      setSelectedItems(selectedItems.filter((selected) => selected !== id))
    } else {
      setSelectedItems([...selectedItems, id])
    }
  }

  const onClearAll = () => {
    setSelectedItems([])
  }

  const { loading, response } = useAxios<T[]>({
    service,
    defaultResponse: defaultResponses.array
  })

  const filteredItems = useMemo(() => {
    const noneItem = {
      _id: 'null',
      [valueField as string]: 'None'
    }

    const filtered = response.filter((item) =>
      String(valueField ? item[valueField] : item)
        .toLowerCase()
        .includes(inputValue.toLowerCase())
    )
    return showNoneProperty ? [noneItem, ...filtered] : filtered
  }, [response, inputValue, valueField, showNoneProperty])

  const menuItems = filteredItems.map((item) => {
    const field = String(valueField ? (item as T)[valueField] : item)
    const id = item._id

    return (
      <MenuItem
        key={field}
        onClick={() => onMenuItemClick(field, id)}
        sx={styles.text}
      >
        <Checkbox checked={selectedNames.includes(field)} />
        {field}
      </MenuItem>
    )
  })

  useEffect(() => {
    const filteredNames = filteredItems
      .filter((item) => selectedItems.includes(item._id))
      .map((item) => String(valueField ? (item as T)[valueField] : item))

    setSelectedNames(filteredNames)
  }, [filteredItems, selectedItems, valueField])

  const scrollableContent = filteredItems.length ? (
    menuItems
  ) : (
    <Box sx={styles.noMatches}>
      <ErrorOutlineIcon sx={styles.noItemsIcon} />
      {t('common.noItems')}
    </Box>
  )

  const itemsLoad = !response.length && loading
  const chosenFiltersText = selectedNames.length
    ? selectedNames.join(', ')
    : t('cooperationsPage.tabs.all')

  const menu = renderMenu(
    <>
      <Box sx={styles.inputWrapper}>
        <InputWithIcon
          onChange={handleInputChange}
          onClear={handleInputReset}
          placeholder={t('common.search')}
          sx={styles.input}
          value={inputValue}
        />
      </Box>

      <AppButton
        disableRipple
        disabled={!selectedItems.length}
        onClick={onClearAll}
        sx={styles.clearAll}
        variant={ButtonVariantEnum.Text}
      >
        <ClearIcon sx={styles.clearIcon} />
        {t('header.notifications.clearAll')}
      </AppButton>

      <Divider sx={styles.divider} />

      <SimpleBar style={styles.scrollableContent}>
        {itemsLoad ? (
          <Loader pageLoad size={20} sx={styles.loader} />
        ) : (
          scrollableContent
        )}
      </SimpleBar>
    </>,
    {
      anchorOrigin: { vertical: 'bottom', horizontal: position },
      slotProps: { paper: styles.menuPaperProps },
      sx: styles.menu(itemsLoad),
      transformOrigin: { vertical: 'top', horizontal: position },
      ...props
    }
  )

  return (
    <>
      <AppButton
        onClick={openMenu}
        sx={spliceSx(styles.root, customSx?.root)}
        variant={ButtonVariantEnum.Tonal}
      >
        <Typography sx={styles.text}>{title}:</Typography>
        <Typography sx={styles.chosenFilters}>{chosenFiltersText}</Typography>
        <KeyboardArrowDownIcon sx={styles.arrowIcon(Boolean(anchorEl))} />
      </AppButton>
      {menu}
    </>
  )
}

export default AppButtonMenu
