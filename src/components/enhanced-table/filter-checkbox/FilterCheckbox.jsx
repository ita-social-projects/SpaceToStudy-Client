import { useTranslation } from 'react-i18next'

import Checkbox from '@mui/material/Checkbox'
import MenuItem from '@mui/material/MenuItem'

const FilterCheckbox = ({ filterCheckbox, filter, setFilter }) => {
  const { t } = useTranslation()

  const handleFilterChange = (e, checkboxValue) => {
    if (e.target.checked) {
      setFilter([...filter, checkboxValue])
    } else {
      const newFilterArr = filter.filter((value) => value !== checkboxValue)
      setFilter(newFilterArr)
    }
  }

  return (
    <MenuItem>
      <Checkbox
        checked={filter.includes(filterCheckbox.value)}
        color='primary'
        inputProps={{ 'aria-label': 'filter-checkbox' }}
        onChange={(e) => handleFilterChange(e, filterCheckbox.value)}
      />
      {t(filterCheckbox.label)}
    </MenuItem>
  )
}

export default FilterCheckbox
