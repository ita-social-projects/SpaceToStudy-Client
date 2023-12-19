import { FC, ReactElement } from 'react'
import { SxProps } from '@mui/material'

import AppButton from '~/components/app-button/AppButton'

import { ButtonVariantEnum, SizeEnum } from '~/types'
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
    <AppButton
      disableRipple
      fullWidth
      onClick={handleOnClick}
      size={SizeEnum.Medium}
      sx={spliceSx(styles.optionsButton, sx)}
      variant={ButtonVariantEnum.Text}
    >
      {icon}
      {value}
    </AppButton>
  )
}

export default DropdownButton
