import { FC, ReactElement } from 'react'
import { SxProps } from '@mui/material'

import Button from '~scss-components/button/Button'

import { spliceSx } from '~/utils/helper-functions'
import { styles } from '~/components/dropdown-add-btn/DropdownButton.styles'

interface DropdownButtonProps {
  handleOnClick: () => void
  icon: ReactElement
  sx?: SxProps
  value: string
}

const DropdownButton: FC<DropdownButtonProps> = ({
  handleOnClick,
  icon,
  sx,
  value
}) => {
  return (
    <Button
      disableRipple
      fullWidth
      onClick={handleOnClick}
      size='md'
      startIcon={icon}
      sx={spliceSx(styles.optionsButton, sx)}
      variant='text-secondary'
    >
      {value}
    </Button>
  )
}

export default DropdownButton
