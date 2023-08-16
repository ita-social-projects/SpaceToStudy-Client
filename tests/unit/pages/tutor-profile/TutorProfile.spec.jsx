import { vi } from 'vitest'
import { screen } from '@testing-library/react'

import useAxios from '~/hooks/use-axios'
import TutorProfile from '~/pages/tutor-profile/TutorProfile.jsx'
import { renderWithProviders } from '~tests/test-utils'

const route = '/tutor/my-profile'
const appMain = {
  userRole: 'tutor',
  _id: '648850c4fdc2d1a130c24aea'
}

const mockData = {
  firstName: 'Іван',
  lastName: 'Мавдрик',
  mainSubjects: {
    student: [],
    tutor: [
      {
        _id: '648850c4fdc2d1a130c24aea',
        name: 'Guitar',
        category: '64884f21fdc2d1a130c24ac0',
        totalOffers: {
          student: 4,
          tutor: 12
        }
      },
      {
        _id: '64885108fdc2d1a130c24af9',
        name: 'Cybersecurity',
        category: '64884f33fdc2d1a130c24ac2',
        totalOffers: {
          student: 3,
          tutor: 20
        }
      }
    ]
  },
  totalReviews: {
    student: 0,
    tutor: 0
  },
  averageRating: {
    student: 0,
    tutor: 0
  }
}

const getFakeData = (load) => {
  return {
    loading: load,
    response: mockData
  }
}

vi.mock('~/hooks/use-axios')

describe('TutorProfile', () => {
  it('should render loader', () => {
    const fakeData = getFakeData(true)

    useAxios.mockImplementation(() => fakeData)
    renderWithProviders(<TutorProfile />, {
      initialEntries: route,
      preloadedState: { appMain }
    })

    const loader = screen.getByTestId('loader')

    expect(loader).toBeInTheDocument()
  })

  it('should find rendering name', () => {
    const fakeData = getFakeData(false)

    useAxios.mockImplementation(() => fakeData)
    renderWithProviders(<TutorProfile />, {
      initialEntries: route,
      preloadedState: { appMain }
    })

    const name = screen.getByText(`${mockData.firstName} ${mockData.lastName}`)

    expect(name).toBeInTheDocument()
  })
})
