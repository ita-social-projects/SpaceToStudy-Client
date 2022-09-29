import Checkbox from '@mui/material/Checkbox'
import MenuItem from '@mui/material/MenuItem'

const FilterCheckbox = ({ filter, filterArr, setFilter }) => {
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
        checked={ filterArr.includes(filter.value) }
        color='primary'
        onChange={ (e) => handleFilterChange(e, filter.value) }
      />
      { filter.label }
    </MenuItem>
  )
}

export default FilterCheckbox
