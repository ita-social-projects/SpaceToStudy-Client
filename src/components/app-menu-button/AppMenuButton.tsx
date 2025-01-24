import { ChangeEvent, FC, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import ClearIcon from '@mui/icons-material/Clear'

import InputField from '~scss-components/input-field/InputField'
import { InputFieldVariantEnum } from '~scss-components/input-field/InputField.constants'
import Button from '~scss-components/button/Button'

import { styles } from '~/components/app-menu-button/AppMenuButton.styles'

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
        <InputField
          onChange={handleInputChange}
          onClear={handleInputReset}
          placeholder={t('common.search')}
          search
          sx={styles.input}
          value={inputValue}
          variant={InputFieldVariantEnum.Outlined}
        />
      </Box>
      <Button
        disableRipple
        disabled={!selectedItems.length}
        onClick={onClearAll}
        startIcon={<ClearIcon sx={styles.clearIcon} />}
        sx={styles.clearAll}
        variant='text-secondary'
      >
        {t('header.notifications.clearAll')}
      </Button>
      <Divider sx={styles.divider} />
      {children}
    </>
  )
}

export default AppMenuButton
