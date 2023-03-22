import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { styles } from '~/components/app-select/AppSelect.styles'
import { SelectFieldType } from '~/types'

interface AppSelectProps {
  setValue:(value:string) => void
  value:string,
  fields:SelectFieldType[],
  selectTitle?:string,
}

const AppSelect:FC<AppSelectProps> = ({ setValue, value, fields, selectTitle = '' }) => {
  const { t } = useTranslation()

  const changeValue = (e:SelectChangeEvent<string>) => setValue(e.target.value)

  const fieldsList = fields.map(field => (
    <MenuItem key={ field.value } value={ field.value }>
      { t(field.title) }
    </MenuItem>)
  )
  const titleEl = selectTitle.length ? (
    <Typography aria-label='select-title'  sx={ styles.selectTitle } variant='subtitle1' >
      { t(selectTitle) }
    </Typography>
  ) : null 

  return (
    <Box sx={ styles.selectContainer } >
      { titleEl }
      <Select
        inputProps={ { 'data-testid': 'app-select' } }
        onChange={ changeValue }
        sx={ styles.selectField }
        value={ value }
      >
        { fieldsList }
      </Select>
    </Box>
  )
}

export default AppSelect
