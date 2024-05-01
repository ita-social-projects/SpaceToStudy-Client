import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import InputLabel from '@mui/material/InputLabel'
import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'
import OutlinedInput from '@mui/material/OutlinedInput'
import Select from '@mui/material/Select'
import { SelectProps, SxProps } from '@mui/material'
import { FC, useId } from 'react'
import { useTranslation } from 'react-i18next'
import { ProficiencyLevelEnum } from '~/types'
import { styles } from './ProficiencyLevelSelect.styles'

interface ProficiencyLevelSelectProps
  extends Omit<SelectProps<ProficiencyLevelEnum[]>, 'sx'> {
  value: ProficiencyLevelEnum[]
  label?: string
  errorMessage?: string
  sx?: {
    select: SxProps
  }
}

const ProficiencyLevelSelect: FC<ProficiencyLevelSelectProps> = ({
  value,
  label,
  errorMessage,
  sx,
  ...props
}) => {
  const { t } = useTranslation()
  const id = useId()

  const menuItems = Object.values(ProficiencyLevelEnum).map((item) => (
    <MenuItem key={item} value={item}>
      <Checkbox checked={value.indexOf(item) > -1} />
      <ListItemText primary={item} />
    </MenuItem>
  ))

  const hasError = Boolean(errorMessage)

  const proficiencyLevelError = hasError && (
    <FormHelperText error>
      {t('common.errorMessages.proficiencyLevel')}
    </FormHelperText>
  )

  return (
    <FormControl error={hasError}>
      <InputLabel
        id={`${id}-multiple-checkbox-label`}
        required
        sx={styles.inputColor(hasError)}
      >
        {label}
      </InputLabel>
      <Select
        MenuProps={styles.menuProps}
        error={hasError}
        input={<OutlinedInput label={label} />}
        labelId={`${id}-multiple-checkbox-label`}
        multiple
        renderValue={(selected) => selected.join(', ')}
        sx={sx?.select}
        value={value}
        {...props}
      >
        {menuItems}
      </Select>
      {proficiencyLevelError}
    </FormControl>
  )
}

export default ProficiencyLevelSelect
