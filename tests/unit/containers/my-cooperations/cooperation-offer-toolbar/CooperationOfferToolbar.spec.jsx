import { render, screen } from '@testing-library/react'
import CooperationOfferToolbar from '~/containers/my-cooperations/cooperation-offer-toolbar/CooperationOfferToolbar'

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
      <CooperationOfferToolbar
        filterOptions={filterOptionsMock}
        sortFields={sortFieldsMock}
        sortOptions={sortOptions}
      />
    )

    const input = screen.getByRole('textbox')

    expect(input).toBeInTheDocument()
  })
})
