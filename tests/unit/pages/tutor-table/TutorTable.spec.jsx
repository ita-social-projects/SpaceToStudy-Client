import { screen, render } from '@testing-library/react'

import useAxios from '~/hooks/use-axios'
import TutorTable from '~/pages/tutor-table/TutorTable'

vi.mock('~/hooks/use-axios')

const userDataMock = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'johndoe@example.com',
  status: {
    tutor: 'active'
  }
}

const responseItemsMock = Array(10)
  .fill()
  .map((_, index) => ({
    ...userDataMock,
    _id: `${index}`
  }))

const mockData = {
  loading: false,
  response: { items: responseItemsMock, count: 10 },
  fetchData: vi.fn()
}

describe('TutorTable component', () => {
  useAxios.mockImplementation(() => mockData)

  it('should render TutorTable component', () => {
    render(<TutorTable />)

    const tabTitle = screen.getByText('userTable.tutorsTab')

    expect(tabTitle).toBeInTheDocument()
  })
})
