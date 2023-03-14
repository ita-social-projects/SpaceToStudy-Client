import { vi } from 'vitest'
import { fireEvent, screen, render } from '@testing-library/react'
import FilterCell from '~/components/enhanced-table/filter-row/filter-cell'

const mockedProps = {
     column : {label: 'studentTable.email', field: 'email', dataType: 'string'},
     filter : ' ',
    setFilter : vi.fn(),
    clearFilter : vi.fn()
}



describe('FilterRow tests', () => {
    beforeEach(() => {
      render(<FilterRow {...mockedProps} />)
    })
    
    it('Should render all filter icons', () => {
      const searchIcon = screen.getByTestId('SearchIcon')
      
      expect(searchIcon.length).toBe(1)
    })
    
  })