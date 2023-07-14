import ClearRoundedIcon from '@mui/icons-material/ClearRounded'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'

import { styles } from '~/components/input-with-icon/InputWithIcon.styles'

const InputWithIcon = ({ value, onClear, startIcon, sx, ...props }) => {
  return (
    <Box sx={[styles.root, sx]}>
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
