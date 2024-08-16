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
import { styles } from '~/containers/proficiency-level-select/ProficiencyLevelSelect.styles'
import { updateCheckBoxState } from '~/utils/checkbox-list'

interface ProficiencyLevelSelectProps
  extends Omit<SelectProps<ProficiencyLevelEnum[]>, 'sx' | 'onChange'> {
  value: ProficiencyLevelEnum[]
  label?: string
  labels?: ReadonlyMap<ProficiencyLevelEnum, string>
  errorMessage?: string
  fillRange?: boolean
  sx?: {
    select: SxProps
    formSx?: SxProps
  }
  onChange: (event: ProficiencyLevelEnum[]) => void
}

const ProficiencyLevelSelect: FC<ProficiencyLevelSelectProps> = ({
  value = [],
  label,
  labels,
  errorMessage = '',
  sx,
  fillRange = false,
  onChange,
  ...props
}) => {
  const { t } = useTranslation()
  const id = useId()
  const proficiencyLevelItems = Object.values(ProficiencyLevelEnum)

  const handleCheckbox = (checkbox: ProficiencyLevelEnum) => {
    const updatedCheckboxes = updateCheckBoxState(
      proficiencyLevelItems,
      value,
      checkbox,
      fillRange
    )

    onChange(updatedCheckboxes)
  }

  const menuItems = proficiencyLevelItems.map((checkbox) => (
    <MenuItem
      key={checkbox}
      onClick={() => handleCheckbox(checkbox)}
      value={checkbox}
    >
      <Checkbox checked={value.indexOf(checkbox) > -1} />
      <ListItemText
        primary={labels?.has(checkbox) ? t(labels.get(checkbox)!) : t(checkbox)}
      />
    </MenuItem>
  ))

  const hasError = Boolean(errorMessage)

  const proficiencyLevelError = hasError && (
    <FormHelperText error>
      {t('common.errorMessages.proficiencyLevel')}
    </FormHelperText>
  )

  const renderSelectedValue = (selected: ProficiencyLevelEnum[]) => {
    const translatedValues = selected.map((level) =>
      labels?.has(level) ? t(labels.get(level)!) : t(level)
    )

    return fillRange && selected.length > 1
      ? `${translatedValues[0]} - ${
          translatedValues[translatedValues.length - 1]
        }`
      : translatedValues.join(', ')
  }

  return (
    <FormControl error={hasError} sx={sx?.formSx}>
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
        inputProps={{ 'data-testid': 'proficiency-levels' }}
        labelId={`${id}-multiple-checkbox-label`}
        multiple
        renderValue={(selected) => renderSelectedValue(selected)}
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
