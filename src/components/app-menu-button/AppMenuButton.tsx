import { ChangeEvent, FC, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import ClearIcon from '@mui/icons-material/Clear'
import AppButton from '~/components/app-button/AppButton'
import InputWithIcon from '~/components/input-with-icon/InputWithIcon'

import { styles } from '~/components/app-menu-button/AppMenuButton.styles'
import { ButtonVariantEnum } from '~/types'

interface AppMenuButtonProps {
  selectedItems: string[]
  children: ReactNode
  onClearAll: () => void
  setInputValue: (value: string) => void
  inputValue: string
}

const AppMenuButton: FC<AppMenuButtonProps> = ({
  selectedItems,
  onClearAll,
  children,
  setInputValue,
  inputValue
}) => {
  const { t } = useTranslation()

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleInputReset = () => {
    setInputValue('')
  }

  return (
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
      {children}
    </>
  )
}

export default AppMenuButton
