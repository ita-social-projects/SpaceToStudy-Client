import { ReactNode } from 'react'

import {
  Box,
  Checkbox,
  CheckboxProps,
  FormControlLabel,
  Tooltip
} from '@mui/material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { PositionEnum } from '~/types'

import { styles } from './CheckboxWithTooltip.styles'

interface CheckboxWithTooltipProps extends CheckboxProps {
  label: ReactNode
  tooltipTitle: ReactNode
}

const CheckboxWithTooltip = ({
  label,
  tooltipTitle,
  ...props
}: CheckboxWithTooltipProps) => {
  return (
    <Box sx={styles.root}>
      <FormControlLabel
        componentsProps={{
          typography: {
            sx: styles.typography
          }
        }}
        control={<Checkbox {...props} />}
        label={label}
        sx={styles.label}
      />
      <Tooltip
        arrow
        componentsProps={{
          tooltip: {
            sx: styles.tooltip
          }
        }}
        placement={PositionEnum.Right}
        title={tooltipTitle}
      >
        <ErrorOutlineIcon sx={styles.icon} />
      </Tooltip>
    </Box>
  )
}

export default CheckboxWithTooltip
