import { FC, useState, useRef, useEffect, ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'

import IconButton from '@mui/material/IconButton'
import ClearIcon from '@mui/icons-material/Clear'
import DoneIcon from '@mui/icons-material/Done'
import InputBase from '@mui/material/InputBase'
import Box from '@mui/material/Box'

import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

import { snackbarVariants } from '~/constants'
import { convertBytesToProperFormat } from '~/utils/helper-functions'
import { styles } from '~/components/icon-extension-with-title/IconExtensionWithTitle.styles'

interface IconExtensionWithTitleProps {
  title: string
  size?: number
  isEditable?: boolean
  onCancel?: () => void
  onSave?: (fileName: string) => Promise<void>
}

const IconExtensionWithTitle: FC<IconExtensionWithTitleProps> = ({
  title,
  size,
  isEditable = false,
  onCancel,
  onSave
}) => {
  const { t } = useTranslation()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const initialInputValue = title.substring(0, title.lastIndexOf('.'))
  const [inputValue, setInputValue] = useState<string>(initialInputValue)
  const [fileExtension] = title.split('.').reverse()

  const convertSize = (incomingSize: number) => {
    const { size: properSize, unit } = convertBytesToProperFormat(incomingSize)
    return properSize + ' ' + t(`common.${unit}`)
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const onCancelHandler = () => {
    onCancel?.()
  }

  const onSaveHandler = () => {
    const trimmedValue = inputValue.trim()
    const value = trimmedValue !== initialInputValue ? trimmedValue : ''
    onSave && void onSave(value)
  }

  useEffect(() => {
    inputRef?.current?.select()
    !isEditable && setInputValue(initialInputValue)
  }, [isEditable, initialInputValue])

  const actionIcons = (
    <Box>
      <IconButton onClick={onCancelHandler}>
        <ClearIcon sx={styles.actionIcon(snackbarVariants.error)} />
      </IconButton>
      <IconButton onClick={onSaveHandler}>
        <DoneIcon sx={styles.actionIcon(snackbarVariants.success)} />
      </IconButton>
    </Box>
  )

  return (
    <Box sx={styles.container}>
      <Box sx={styles.iconBox}>{fileExtension}</Box>
      {isEditable ? (
        <Box sx={styles.inputWithIcons}>
          <InputBase
            inputRef={inputRef}
            onChange={onChange}
            sx={styles.input}
            value={inputValue}
          />
          {actionIcons}
        </Box>
      ) : (
        <TitleWithDescription
          description={size && convertSize(size)}
          style={styles.titleWithDescription}
          title={title}
        />
      )}
    </Box>
  )
}

export default IconExtensionWithTitle
