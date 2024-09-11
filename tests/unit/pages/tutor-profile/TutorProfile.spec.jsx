import { screen } from '@testing-library/react'

import useAxios from '~/hooks/use-axios'
import UserProfile from '~/pages/user-profile/UserProfile.jsx'
import { renderWithProviders } from '~tests/test-utils'

const route = '/tutor/my-profile'

const tutorAppMain = {
  userRole: 'tutor',
  _id: '648850c4fdc2d1a130c24aea'
}

const studentAppMain = {
  userRole: 'student',
  _id: '648850c4fdc2d1a130c24aeb'
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

const professionalBlockMock = {
  professionalBlock: {
    awards: 'My awards are countless, why bother telling you them?'
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
        category: { _id: '64884f21fdc2d1a130c24ac0', name: 'Music' },
        subjects: [{ _id: '64885108fdc2d1a130c24af9', name: 'Guitar' }]
      },
      {
        _id: '648850c4fdc2d1342130c24d',
        category: { _id: '64884f21fdc2d1a130c24ac0', name: 'Cooking' },
        subjects: [{ _id: '64885108fdc2d1a130c24af9', name: 'Gastronomy' }]
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
  renderWithProviders(<UserProfile />, {
    preloadedState: { appMain },
    initialEntries: route
  })
}

vi.mock('~/hooks/use-axios')

describe('UserProfile', () => {
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
      'userProfilePage.videoPresentation.title'
    )
    expect(videoBlockTitle).toBeInTheDocument()
  })

  it('Should not render video presentation block when student has no video link', () => {
    renderWithMockData({ appMain: studentAppMain })

    const videoBlockTitle = screen.queryByText(
      'userProfilePage.videoPresentation.title'
    )
    expect(videoBlockTitle).not.toBeInTheDocument()
  })

  it('Should render video presentation block when student has a video link', () => {
    renderWithMockData({
      appMain: studentAppMain,
      extraData: videoMockDataStudent
    })

    const videoBlockTitle = screen.getByText(
      'userProfilePage.videoPresentation.title'
    )
    expect(videoBlockTitle).toBeInTheDocument()
  })

  it('Should render professional block info for tutor', () => {
    renderWithMockData({
      appMain: tutorAppMain,
      extraData: professionalBlockMock
    })

    const aboutTutorTitle = screen.getByText('userProfilePage.aboutTutor.title')
    expect(aboutTutorTitle).toBeInTheDocument()
  })

  it('Should not render professional block info for tutor if there is no information', () => {
    renderWithMockData({
      appMain: tutorAppMain
    })

    const aboutTutorTitle = screen.queryByText(
      'userProfilePage.aboutTutor.title'
    )
    expect(aboutTutorTitle).not.toBeInTheDocument()
  })
})
