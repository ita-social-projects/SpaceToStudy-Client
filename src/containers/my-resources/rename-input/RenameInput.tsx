import { FC, useState, useRef, useEffect, ChangeEvent } from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'
import ClearIcon from '@mui/icons-material/Clear'
import DoneIcon from '@mui/icons-material/Done'

import { styles } from '~/containers/my-resources/rename-input/RenameInput.styles'
import { snackbarVariants } from '~/constants'

interface RenameInputProps {
  initValue: string
  onCancel: () => void
  onSave: (name: string) => Promise<void>
}

const RenameInput: FC<RenameInputProps> = ({ initValue, onCancel, onSave }) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [inputValue, setInputValue] = useState<string>(initValue)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const onSaveHandler = () => {
    const trimmedValue = inputValue.trim()
    const value = trimmedValue !== initValue ? trimmedValue : ''

    void onSave(value)
  }

  useEffect(() => {
    inputRef?.current?.select()
    setInputValue(initValue)
  }, [initValue])

  const disabled = inputValue.length > 50 || inputValue.length < 1

  return (
    <Box sx={styles.inputWithIcons}>
      <InputBase
        inputRef={inputRef}
        onChange={onChange}
        sx={styles.input}
        value={inputValue}
      />

      <Box sx={styles.actions}>
        <IconButton onClick={onCancel}>
          <ClearIcon sx={styles.actionIcon(snackbarVariants.error)} />
        </IconButton>
        <IconButton disabled={disabled} onClick={onSaveHandler}>
          <DoneIcon
            sx={styles.actionIcon(snackbarVariants.success, disabled)}
          />
        </IconButton>
      </Box>
    </Box>
  )
}

export default RenameInput
