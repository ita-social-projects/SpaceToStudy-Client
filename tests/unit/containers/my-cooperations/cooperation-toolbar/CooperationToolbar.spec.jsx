import { render, screen } from '@testing-library/react'
import CooperationToolbar from '~/containers/my-cooperations/cooperation-toolbar/CooperationToolbar'

const filterOptionsMock = {
  filters: {
    search: '',
    status: ''
  },
  setFilterByKey: () => vi.fn()
}
const sortFieldsMock = [{ title: 'test', value: 'name asc' }]
const sortOptions = {
  sort: { orderBy: 'name', order: 'asc' },
  onRequestSort: () => vi.fn()
}

describe('CooperationContainer component ', () => {
  it('should render card in container', () => {
    render(
      <CooperationToolbar
        filterOptions={filterOptionsMock}
        sortFields={sortFieldsMock}
        sortOptions={sortOptions}
      />
    )

    const input = screen.getByRole('textbox')

    expect(input).toBeInTheDocument()
  })
})
