import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import TabFilterList from '~/components/tab-filter-list/TabFilterList'

const mockData = {
  tab1: {
    label: 'Tab 1',
    value: 'tab1'
  },
  tab2: {
    label: 'Tab 2',
    value: 'tab2'
  }
}

const handleClickMock = vi.fn()

describe('TabFilterList', () => {
  beforeEach(() => {
    render(
      <TabFilterList
        activeTab='tab1'
        onClick={handleClickMock}
        tabsData={mockData}
      />
    )
  })

  it('renders TabFilterList correctly', () => {
    expect(screen.getByText('Tab 1')).toBeInTheDocument()
    expect(screen.getByText('Tab 2')).toBeInTheDocument()
  })

  it('calls handleClick when a tab is clicked', () => {
    fireEvent.click(screen.getByText('Tab 2'))
    expect(handleClickMock).toHaveBeenCalled()
  })
})
