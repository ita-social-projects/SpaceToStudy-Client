import { Box, IconButton, Typography } from '@mui/material'
import {
  CalendarPicker,
  LocalizationProvider,
  PickersDay,
  PickersDayProps
} from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { useState } from 'react'
import { styles } from './Calendar.styles'
import { PickersArrowSwitcher } from '@mui/x-date-pickers/internals'
import { isSameDay } from 'date-fns'
import { getFormattedDate } from '~/utils/helper-functions'
import EditCalendarIcon from '@mui/icons-material/EditCalendar'

const mockedData = [
  {
    value: '2024-09-06',
    count: 2
  },
  {
    value: '2024-09-14',
    count: 1
  },
  {
    value: '2024-09-19',
    count: 3
  }
]

function Calendar() {
  const [date, setDate] = useState<Date>(new Date())

  const renderDay = (
    day: Date,
    _value: Date[],
    DayComponentProps: PickersDayProps<Date>
  ) => {
    const countOfLessonsPerDay = mockedData.find((item) =>
      isSameDay(new Date(item.value), day)
    )?.count

    const dotElements = countOfLessonsPerDay ? (
      <Box sx={styles.dotsContainer}>
        {Array.from({ length: countOfLessonsPerDay }, (_, index) => index).map(
          (item) => (
            <Box key={item} sx={styles.dots} />
          )
        )}
      </Box>
    ) : null

    const dayElement = (
      <Box sx={styles.mainWrapper}>
        <PickersDay
          {...DayComponentProps}
          selected={isSameDay(day, new Date())}
          sx={styles.day}
        />
        {dotElements}
      </Box>
    )

    return dayElement
  }

  const calendarElement = (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={styles.calendarContainer}>
        <Box sx={styles.calendarHeader}>
          <Typography sx={styles.currentMonth}>
            {getFormattedDate({ date, options: { month: 'long' } })}
          </Typography>
          <PickersArrowSwitcher
            componentsProps={{
              leftArrowButton: {
                sx: styles.arrows
              },
              rightArrowButton: {
                sx: styles.arrows
              }
            }}
            isLeftDisabled={false}
            isRightDisabled={false}
            onLeftClick={() =>
              setDate(new Date(date?.setMonth(date.getMonth() - 1)))
            }
            onRightClick={() =>
              setDate(new Date(date?.setMonth(date.getMonth() + 1)))
            }
          />
          <IconButton sx={styles.iconButton}>
            <EditCalendarIcon sx={styles.icon}></EditCalendarIcon>
          </IconButton>
        </Box>

        <CalendarPicker
          date={date}
          onChange={(newDate) => setDate(newDate || new Date())}
          readOnly
          renderDay={renderDay}
          showDaysOutsideCurrentMonth
          views={['day']}
        />
      </Box>
    </LocalizationProvider>
  )

  return calendarElement
}

export default Calendar
