import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import MenuItem from '@mui/material/MenuItem'
import Menu, { MenuProps } from '@mui/material/Menu'

import { languageMenuConstants } from '~/containers/layout/language-menu/LanguageMenu.constants'
import { setToLocalStorage } from '~/services/local-storage-service'
import { useSnackBarContext } from '~/context/snackbar-context'

import { styles } from '~/containers/layout/language-menu/LanguageMenu.styles'

interface LanguageMenuProps {
  anchorEl: MenuProps['anchorEl']
  onClose: () => void
}
const LanguageMenu: FC<LanguageMenuProps> = ({ anchorEl, onClose }) => {
  const { i18n } = useTranslation()
  const { setAlert } = useSnackBarContext()

  const handleLanguageChange = (language: string) => {
    i18n
      .changeLanguage(language)
      .then(() => {
        setToLocalStorage('language', language)
        onClose()
      })
      .catch(() => {
        setAlert({
          message: 'Failed to change language',
          severity: 'error',
          duration: 1000
        })
      })
  }

  const menuItems = languageMenuConstants.map(({ language, languageCode }) => {
    const sx = i18n.language === languageCode ? styles.active : undefined

    return (
      <MenuItem
        key={languageCode}
        onClick={() => handleLanguageChange(languageCode)}
        sx={sx}
      >
        {language}
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
