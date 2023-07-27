import { useTranslation } from 'react-i18next'
import { ajustColumns } from '~/utils/helper-functions'

import SearchIcon from '@mui/icons-material/Search'
import { Box } from '@mui/material'

import { ChangeEvent, useState } from 'react'
import AppButton from '~/components/app-button/AppButton'
import EnhancedTable from '~/components/enhanced-table/EnhancedTable'
import InputWithIcon from '~/components/input-with-icon/InputWithIcon'
import { removeColumnRules } from '~/containers/my-resources/lessons-container/LessonsContainer.constants'
import { styles } from '~/containers/my-resources/lessons-container/LessonsContainer.styles'
import useBreakpoints from '~/hooks/use-breakpoints'
import { Lesson, SortEnum } from '~/types'
import { columns } from './LessonsContainer.constants copy'

const items: Lesson[] = [
  {
    _id: 'ewqdwqdqwd2312',
    title:
      'Advanced Quantum Mechanics: Theoretical Concepts Part 2 Advanced Quantum Mechanics: Theoretical Concepts Part 2Advanced Quantum Mech',
    attachments: ['ww'],
    updatedAt: new Date(Date.now() + 5000000).toString(),
    createdAt: new Date().toString()
  },
  {
    _id: 'ewqdwqdqwd2312',
    title: 'Joray weito',
    attachments: ['ww', 'ww', '2', '33ds'],
    updatedAt: new Date(Date.now() - 5000000).toString(),
    createdAt: new Date().toString()
  }
]

const LessonsContainer = () => {
  const breakpoints = useBreakpoints()
  const { t } = useTranslation()
  const [search, setSearch] = useState('')
  const [testItems, setTestItems] = useState(items)

  const handleOnSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleOnSearchClean = () => {
    setSearch('')
  }

  const columnsToShow = ajustColumns<Lesson>(
    breakpoints,
    columns,
    removeColumnRules
  )

  const rowActions = [
    {
      label: t('Edit'),
      func: () => {
        //
      }
    },
    {
      label: t('Delete'),
      func: () => {
        //
      }
    }
  ]

  return (
    <Box>
      <Box sx={styles.topContainer}>
        <AppButton sx={styles.addLessonBtn}>
          New lesson{' '}
          <span style={{ fontSize: '20px', marginLeft: '5px' }}>+</span>
        </AppButton>
        <InputWithIcon
          endAdornment={<SearchIcon sx={styles.searchIcon} />}
          onChange={handleOnSearch}
          onClear={handleOnSearchClean}
          placeholder={t('cooperationsPage.search')}
          sx={styles.input}
          value={search}
        />
      </Box>
      <EnhancedTable
        columns={columnsToShow}
        data={{ items: testItems }}
        emptyTableKey='You have no lessons yet'
        rowActions={rowActions}
        sort={{
          sort: {
            order: SortEnum.Asc,
            orderBy: 'title'
          },
          onRequestSort: (columnField: string) => {
            setTestItems((items) => items.sort())
          }
        }}
      />
    </Box>
  )
}

export default LessonsContainer
