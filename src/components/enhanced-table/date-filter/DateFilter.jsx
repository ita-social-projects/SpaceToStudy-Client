import { useState } from 'react'
import { format } from 'date-fns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import ClearIcon from '@mui/icons-material/Clear'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'

import { initialState, datePickersOptions } from './constants'
import { styles } from './DateFilter.styles'

const DateFilter = ({ filter, setFilter, clearFilter }) => {
  const [open, setOpen] = useState(initialState)

  const handleChange = (direction) => (date) => {
    setFilter({ ...filter, [direction]: format(date, 'yyyy-MM-dd') })
  }

  const handleClose = (direction) => {
    setOpen((prev) => ({ ...prev, [direction]: false }))
  }

  const handleOpen = (direction) => {
    setOpen((prev) => ({ ...prev, [direction]: true }))
  }

  const endAdornment = (
    <IconButton
      className={filter.from || filter.to ? 'visible' : 'hidden'}
      data-testid='clear-icon'
      onClick={clearFilter}
    >
      <ClearIcon color='primary' />
    </IconButton>
  )

  const datePickers = datePickersOptions.map(({ placement, direction }) => (
    <DesktopDatePicker
      PopperProps={{ placement: placement }}
      inputProps={{ 'aria-label': `date-filter-${direction}` }}
      key={direction}
      onChange={handleChange(direction)}
      onClose={() => handleClose(direction)}
      onOpen={() => handleOpen(direction)}
      open={open[direction]}
      renderInput={(params) => (
        <TextField sx={styles.datePicker} variant='standard' {...params} />
      )}
      value={filter[direction]}
    />
  ))

  return (
    <>
      <TextField
        InputProps={{
          startAdornment: (
            <IconButton
              data-testid='calendar-icon'
              onClick={() =>
                setOpen({
                  from: true,
                  to: true
                })
              }
            >
              <CalendarMonthIcon color='primary' />
            </IconButton>
          ),
          endAdornment: endAdornment,
          readOnly: true
        }}
        sx={styles.input}
        variant='standard'
      />
      <Box sx={styles.datePickers}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          {datePickers}
        </LocalizationProvider>
      </Box>
    </>
  )
}

export default DateFilter
