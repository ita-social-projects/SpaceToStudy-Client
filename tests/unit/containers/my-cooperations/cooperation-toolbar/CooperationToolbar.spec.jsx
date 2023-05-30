import { render, screen } from '@testing-library/react'
import CooperationToolbar from '~/containers/my-cooperations/cooperation-toolbar/CooperationToolbar'

const filterOptionsMock = {
  filters: {
    sort: 'name',
    search: '',
    status: '',
    view: 'grid'
  },
  setFilterByKey: () => vi.fn()
}
const sortOptionsMock = [{ title: 'test', value: 'name' }]

describe('CooperationContainer component ', () => {
  it('should render card in container', () => {
    render(
      <CooperationToolbar
        filterOptions={filterOptionsMock}
        sortOptions={sortOptionsMock}
      />
    )

    const input = screen.getByRole('textbox')

    expect(input).toBeInTheDocument()
  })
})
