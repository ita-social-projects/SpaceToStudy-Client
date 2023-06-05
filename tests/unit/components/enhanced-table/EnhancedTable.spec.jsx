import { render } from '@testing-library/react'
import { beforeEach } from 'vitest'
import EnhancedTable from '~/components/enhanced-table/EnhancedTable.tsx'

describe('EnhancedTable component', () => {
  beforeEach(() => {
    render(<EnhancedTable></EnhancedTable>)
  })
})
