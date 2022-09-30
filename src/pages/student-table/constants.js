import Box from '@mui/material/Box'

export const tabLabels = [
  { label: 'studentTable.all', filterKey: 'isEmailConfirmed', value: null },
  { label: 'studentTable.active', filterKey: 'isEmailConfirmed', value: true },
  { label: 'studentTable.unactive', filterKey: 'isEmailConfirmed', value: false }
]

export const columns = (t) => [
  {
    label: t('studentTable.name'),
    id: 'firstName'
  },
  {
    label: t('studentTable.email'),
    id: 'email'
  },
  {
    label: t('studentTable.role'),
    id: 'role'
  },
  {
    label: t('studentTable.lastLogin'),
    id: 'lastLogin'
  },
  {
    label: t('studentTable.firstLogin'),
    id: 'isFirstLogin',
    filterCheckboxesArr: [
      {
        label: t('studentTable.firstLogin'),
        value: true
      },
      {
        label: t('studentTable.notFirstLogin'),
        value: false
      }
    ]
  }
]

export const rowPropsArr = [
  {
    propKey: ['firstName', 'lastName'],
    component: (propValue) => (<Box>
      { propValue }
    </Box>)
  },
  {
    propKey: 'email',
    component: (propValue) => (<Box>
      { propValue }
    </Box>)
  },
  {
    propKey: 'role',
    component: (propValue) => (<Box>
      { propValue }
    </Box>)
  },
  {
    propKey: 'lastLogin',
    component: (propValue) => (<Box>
      { propValue }
    </Box>)
  },
  {
    propKey: 'isFirstLogin',
    component: (propValue) => (<Box>
      { propValue }
    </Box>)
  }
]
