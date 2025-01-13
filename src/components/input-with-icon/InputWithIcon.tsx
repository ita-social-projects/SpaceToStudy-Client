import { FC, ReactNode } from 'react'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded'
import Box from '@mui/material/Box'
import InputBase, { InputBaseProps } from '@mui/material/InputBase'
import { SxProps } from '@mui/material'

import { IconButton } from '~/design-system/components/icon-button/IconButton'
import { styles } from '~/components/input-with-icon/InputWithIcon.styles'

interface InputWithIconProps extends InputBaseProps {
  startIcon?: ReactNode
  onClear: () => void
  value: string
}

const InputWithIcon: FC<InputWithIconProps> = ({
  value,
  onClear,
  startIcon,
  sx,
  ...props
}) => {
  return (
    <Box sx={[styles.root, sx] as SxProps}>
      {startIcon}
      <InputBase sx={styles.input} value={value} {...props} />
      {value && (
        <IconButton
          data-testid='clearIcon'
          onClick={onClear}
          sx={styles.clearIcon}
        >
          <ClearRoundedIcon sx={styles.clearIcon} />
        </IconButton>
      )}
    </Box>
  )
}

export default InputWithIcon
