import { ReactNode, useCallback } from 'react'

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
  onChecked?: (value: boolean) => void
}

const CheckboxWithTooltip = ({
  label,
  tooltipTitle,
  onChecked,
  ...props
}: CheckboxWithTooltipProps) => {
  const onChangeHandler = useCallback(
    (_: React.SyntheticEvent, checked: boolean) => onChecked?.(checked),
    [onChecked]
  )

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
        onChange={onChangeHandler}
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
