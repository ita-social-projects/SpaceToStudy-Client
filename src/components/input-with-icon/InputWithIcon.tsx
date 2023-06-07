import { FC, ReactNode, useState } from 'react'
import IconButton from '@mui/material/IconButton'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded'
import Box from '@mui/material/Box'
import InputBase, { InputBaseProps } from '@mui/material/InputBase'
import { SxProps } from '@mui/material'

import { styles } from '~/components/input-with-icon/InputWithIcon.styles'

interface InputWithIconProps extends InputBaseProps {
  startIcon?: ReactNode
}

const InputWithIcon: FC<InputWithIconProps> = ({
  value,
  startIcon,
  sx,
  ...props
}) => {
  const [inputValue, setInputValue] = useState(value)
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputValue(e.target.value)
  const handleClear = () => {
    setInputValue('')
  }

  return (
    <Box sx={[styles.root, sx] as SxProps}>
      {startIcon}
      <InputBase
        sx={styles.input}
        value={inputValue}
        {...props}
        onInput={handleInput}
      />
      {inputValue && (
        <IconButton onClick={handleClear}>
          <ClearRoundedIcon data-testid='clearIcon' sx={styles.clearIcon} />
        </IconButton>
      )}
    </Box>
  )
}

export default InputWithIcon
