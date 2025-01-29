import { useState, useMemo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import SimpleBar from 'simplebar-react'
import { SxProps } from '@mui/material'
import Box from '@mui/material/Box'
import { MenuProps } from '@mui/material/Menu'
import { PopoverOrigin } from '@mui/material/Popover'
import Typography from '@mui/material/Typography'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import CircleIcon from '@mui/icons-material/Circle'

import useQuery from '~/hooks/use-query'
import useMenu from '~/hooks/use-menu'
import Loader from '~/components/loader/Loader'
import AppMenuButton from '~/components/app-menu-button/AppMenuButton'
import AppSelectButton from '~/components/app-select-button/AppSelectButton'
import Button from '~scss-components/button/Button'

import { spliceSx } from '~/utils/helper-functions'
import { styles } from '~/components/app-button-menu/AppButtonMenu.styles'
import { CategoryNameInterface, type ServiceFunctionNew } from '~/types'

interface AppButtonMenuProps<T> extends Omit<MenuProps, 'open'> {
  title: string
  service: ServiceFunctionNew<T[]>
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

  const { data: response, isLoading } = useQuery({
    queryKey: ['app-button-menu', title],
    queryFn: service
  })

  const filteredItems = useMemo(() => {
    if (!response) {
      return []
    }
    const noneItem = {
      _id: 'null',
      [valueField as string]: 'No category'
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
      <AppSelectButton
        checked={selectedNames.includes(field)}
        key={item._id}
        onMenuItemClick={() => onMenuItemClick(field, id)}
      >
        {field}
      </AppSelectButton>
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

  const itemsLoad = !response || isLoading
  const chosenFiltersText = selectedNames.length
    ? selectedNames.join(', ')
    : t('cooperationsPage.tabs.all')

  const menu = renderMenu(
    <AppMenuButton
      inputValue={inputValue}
      onClearAll={onClearAll}
      selectedItems={selectedItems}
      setInputValue={setInputValue}
    >
      <SimpleBar style={styles.scrollableContent}>
        {itemsLoad ? (
          <Loader pageLoad size={20} sx={styles.loader} />
        ) : (
          scrollableContent
        )}
      </SimpleBar>
    </AppMenuButton>,
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
      <Button
        endIcon={
          <KeyboardArrowDownIcon sx={styles.arrowIcon(Boolean(anchorEl))} />
        }
        onClick={openMenu}
        size='sm'
        startIcon={<CircleIcon sx={styles.unorderedListIcon} />}
        sx={spliceSx(styles.root, customSx?.root)}
        variant='tonal'
      >
        <Typography sx={styles.text}>{title}:</Typography>
        <Typography sx={styles.chosenFilters}>{chosenFiltersText}</Typography>
      </Button>
      {menu}
    </>
  )
}

export default AppButtonMenu
