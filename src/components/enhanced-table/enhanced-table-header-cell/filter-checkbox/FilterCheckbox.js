import { useTranslation } from 'react-i18next'

import Checkbox from '@mui/material/Checkbox'
import MenuItem from '@mui/material/MenuItem'

const FilterCheckbox = ({ filterCheckbox, filterArr, setFilter }) => {
  const { t } = useTranslation()

  const handleFilterChange = (e, checkboxValue) => {
    if (e.target.checked) {
      setFilter((prevState) => [...prevState, checkboxValue])
    } else {
      const newFilterArr = filterArr.filter((value) => value !== checkboxValue)
      setFilter(newFilterArr)
    }
  }

  return (
    <MenuItem>
      <Checkbox
        checked={ filterArr.includes(filterCheckbox.value) }
        color='primary'
        onChange={ (e) => handleFilterChange(e, filterCheckbox.value) }
      />
      { t(filterCheckbox.label) }
    </MenuItem>
  )
}

export default FilterCheckbox
