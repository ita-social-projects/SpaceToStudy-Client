import { screen, fireEvent } from '@testing-library/react'
import { authRoutes } from '~/router/constants/authRoutes'

import { renderWithProviders } from '~tests/test-utils'
import { mockedCooperations as testCooperations } from '~tests/test-constants'
import ActiveStudentsBlock from '~/components/active-students/ActiveStudentsBlock'
import useQuery from '~/hooks/use-query'
import { vi } from 'vitest'

vi.mock('~/hooks/use-query')

const navigateMock = vi.fn()

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => navigateMock
}))

const mockedCooperations = [
  {
    ...testCooperations.items[0],
    _id: '66ec53d40d9d9983a952541',
    subject: { name: 'Web Development' },
    user: {
      _id: '6565f781b2b2c701e9183cb8',
      firstName: 'John',
      lastName: 'Doe',
      photo: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61'
    }
  },
  {
    ...testCooperations.items[0],
    _id: '66ec53d40d9d9983a952542',
    subject: { name: 'UI/UX Design' },
    user: {
      _id: '6565f781b2b2c701e9183cb8',
      firstName: 'Jane',
      lastName: 'Doe',
      photo: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61'
    }
  },
  {
    ...testCooperations.items[0],
    _id: '66ec53d40d9d9983a952543',
    subject: { name: 'Testing' },
    user: {
      _id: '6565f781b2b2c701e9183cb8',
      firstName: 'Jack',
      lastName: 'Black',
      photo: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61'
    }
  }
]

const mockedData = {
  isLoading: false,
  data: {
    items: mockedCooperations,
    count: 3
  },
  refetch: vi.fn()
}

const mockedLoading = {
  isLoading: true,
  response: null,
  refetch: vi.fn()
}

const noCooperationsMock = {
  isLoading: false,
  data: {
    items: [],
    count: 0
  },
  error: null,
  refetch: vi.fn()
}

const errorCooperationsMock = {
  isLoading: false,
  data: {
    items: [],
    count: 0
  },
  error: {
    code: 'not found',
    message: 'cooperation not found',
    status: '404'
  },
  refetch: vi.fn()
}

describe('ActiveStudentsBlock', () => {
  useQuery.mockImplementation(() => mockedData)

  it('should render active students', () => {
    renderWithProviders(<ActiveStudentsBlock />)

    for (const cooperation of mockedCooperations) {
      const fullName = screen.getByText(
        `${cooperation.user.firstName} ${cooperation.user.lastName}`
      )
      const subjectName = screen.getByText(cooperation.subject.name)

      expect(fullName).toBeInTheDocument()
      expect(subjectName).toBeInTheDocument()
    }
  })

  it('should navigate to /my-cooperations on Show More button click', () => {
    renderWithProviders(<ActiveStudentsBlock />)

    const showMoreButton = screen.getByTestId('showMore')
    fireEvent.click(showMoreButton)

    expect(navigateMock).toHaveBeenCalledWith(
      authRoutes.cooperationDetails.path
    )
  })

  it('should render Loader when loading', () => {
    useQuery.mockImplementation(() => mockedLoading)
    renderWithProviders(<ActiveStudentsBlock />)

    expect(screen.getByTestId('loader')).toBeInTheDocument()
  })

  it('should render add student button when no active cooperations available', () => {
    useQuery.mockImplementation(() => noCooperationsMock)
    renderWithProviders(<ActiveStudentsBlock />)
    const addStudent = screen.getByTestId('addStudent')
    expect(addStudent).toBeInTheDocument()
  })

  it('should navigate to /categories/subjects/find-offers on add student button click', () => {
    useQuery.mockImplementation(() => noCooperationsMock)
    renderWithProviders(<ActiveStudentsBlock />)

    const showMoreButton = screen.getByTestId('addStudent')
    fireEvent.click(showMoreButton)

    expect(navigateMock).toHaveBeenCalledWith(authRoutes.findOffers.path)
  })

  it('should not render on error', () => {
    useQuery.mockImplementation(() => errorCooperationsMock)
    renderWithProviders(<ActiveStudentsBlock />)

    expect(screen.queryByText('activeStudents.title')).not.toBeInTheDocument()
  })
})
