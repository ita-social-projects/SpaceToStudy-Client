import { vi } from 'vitest'
import { screen } from '@testing-library/react'

import useAxios from '~/hooks/use-axios'
import TutorProfile from '~/pages/tutor-profile/TutorProfile.jsx'
import { renderWithProviders } from '~tests/test-utils'

const route = '/tutor/my-profile'

const tutorAppMain = {
  userRole: 'tutor',
  _id: '648850c4fdc2d1a130c24aea'
}

const studentAppMain = {
  userRole: 'student',
  _id: '648850c4fdc2d1a130c24aea'
}

const videoMockDataStudent = {
  videoLink: {
    student: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  }
}

const videoMockDataTutor = {
  videoLink: {
    tutor: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  }
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

const getFakeData = (load, extraData = {}) => {
  return {
    loading: load,
    response: { ...mockData, ...extraData }
  }
}

const renderWithMockData = ({
  load = false,
  appMain = tutorAppMain,
  extraData = {}
} = {}) => {
  const fakeData = getFakeData(load, extraData)

  useAxios.mockImplementation(() => fakeData)
  renderWithProviders(<TutorProfile />, {
    preloadedState: { appMain },
    initialEntries: route
  })
}

vi.mock('~/hooks/use-axios')

describe('TutorProfile', () => {
  it('should render loader', () => {
    renderWithMockData({ load: true })

    const loader = screen.getByTestId('loader')
    expect(loader).toBeInTheDocument()
  })

  it('should find rendering name', () => {
    renderWithMockData()

    const name = screen.getByText(`${mockData.firstName} ${mockData.lastName}`)
    expect(name).toBeInTheDocument()
  })

  it('Should render video presentation block for tutor', () => {
    renderWithMockData({ extraData: videoMockDataTutor })

    const videoBlockTitle = screen.getByText(
      'tutorProfilePage.videoPresentation.title'
    )
    expect(videoBlockTitle).toBeInTheDocument()
  })

  it('Should not render video presentation block when student has no video link', () => {
    renderWithMockData({ appMain: studentAppMain })

    const videoBlockTitle = screen.queryByText(
      'tutorProfilePage.videoPresentation.title'
    )
    expect(videoBlockTitle).not.toBeInTheDocument()
  })

  it('Should render video presentation block when student has a video link', () => {
    renderWithMockData({
      appMain: studentAppMain,
      extraData: videoMockDataStudent
    })

    const videoBlockTitle = screen.getByText(
      'tutorProfilePage.videoPresentation.title'
    )
    expect(videoBlockTitle).toBeInTheDocument()
  })
})
