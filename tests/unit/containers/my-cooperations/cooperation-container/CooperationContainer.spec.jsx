import { render, screen } from '@testing-library/react'
import CooperationContainer from '~/containers/my-cooperations/cooperations-container/CooperationContainer'

const mockedCoop = {
  _id: 'id',
  offer: {
    description:
      'Hello. There are many variations of passages of There are many variations of passages of... Hello. There are many variations of passages of There are many variations of passages of... Hello. There are many variations of passages of There are many variations of passages of... Hello. There are many variations of passages of There are many variations of passages of... Hello. There are many variations of passages of There are many variations of passages of... Hello. There are many variations of passages of There are many variations of passages of... Hello. There are many variations of passages of There are many variations of passages of... ',
    subject: { _id: 'id', name: 'Quantum Mechanics' }
  },
  user: {
    firstName: 'Kathryn',
    lastName: 'Murphy',
    photo:
      'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
  },
  price: 1800,
  proficiencyLevel: 'Beginner',
  status: 'pending',
  createdAt: '2023-05-13T13:44:25.716Z'
}

const filterOptionsMock = {
  filters: {
    sort: 'name',
    search: '',
    status: '',
    view: 'grid'
  }
}

describe('CooperationContainer component ', () => {
  it('should render card in container', () => {
    render(
      <CooperationContainer
        filterOptions={filterOptionsMock}
        items={[mockedCoop]}
      />
    )

    const level = screen.getByText(mockedCoop.proficiencyLevel)

    expect(level).toBeInTheDocument()
  })
})
