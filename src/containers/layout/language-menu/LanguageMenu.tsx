import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import MenuItem from '@mui/material/MenuItem'
import Menu, { MenuProps } from '@mui/material/Menu'

import { languageMenuConstants } from '~/containers/layout/language-menu/LanguageMenu.constants'
import { setToLocalStorage } from '~/services/local-storage-service'

import { styles } from '~/containers/layout/language-menu/LanguageMenu.styles'
import { useAppDispatch } from '~/hooks/use-redux'
import { openAlert } from '~/redux/features/snackbarSlice'

interface LanguageMenuProps {
  anchorEl: MenuProps['anchorEl']
  onClose: () => void
}
const LanguageMenu: FC<LanguageMenuProps> = ({ anchorEl, onClose }) => {
  const { i18n } = useTranslation()
  const dispatch = useAppDispatch()

  const handleLanguageChange = (language: string) => {
    i18n
      .changeLanguage(language)
      .then(() => {
        setToLocalStorage('language', language)
        onClose()
      })
      .catch(() => {
        dispatch(
          openAlert({
            message: 'Failed to change language',
            severity: 'error',
            duration: 1000
          })
        )
      })
  }

  const menuItems = languageMenuConstants.map(({ value, label }) => {
    const menuItemStyles = i18n.language === value ? styles.active : undefined

    return (
      <MenuItem
        key={value}
        onClick={() => handleLanguageChange(value)}
        sx={menuItemStyles}
      >
        {label}
      </MenuItem>
    )
  })

  return (
    <Menu anchorEl={anchorEl} onClose={onClose} open={Boolean(anchorEl)}>
      {menuItems}
    </Menu>
  )
}

export default LanguageMenu
