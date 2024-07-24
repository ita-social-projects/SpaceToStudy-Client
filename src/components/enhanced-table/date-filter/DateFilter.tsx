import React, { useState } from 'react'
import { format } from 'date-fns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import ClearIcon from '@mui/icons-material/Clear'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'

import { initialState, datePickersOptions } from './DateFilter.constants'
import { styles } from './DateFilter.styles'

interface Filter {
  from: string | null
  to: string | null
}

interface OpenState {
  from: boolean
  to: boolean
}

export interface DateFilterProps {
  filter: Filter
  setFilter: (filter: Filter) => void
  clearFilter: () => void
}

const DateFilter: React.FC<DateFilterProps> = ({
  filter,
  setFilter,
  clearFilter
}) => {
  const [open, setOpen] = useState<OpenState>(initialState)

  const handleChange = (direction: string) => (date: Date | null) => {
    if (date) {
      setFilter({ ...filter, [direction]: format(date, 'yyyy-MM-dd') })
    }
  }

  const handleClose = (direction: string) => {
    setOpen((prev) => ({ ...prev, [direction]: false }))
  }

  const handleOpen = (direction: string) => {
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
      InputProps={{ 'aria-label': `date-filter-${direction}` }}
      PopperProps={{ placement: placement }}
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
