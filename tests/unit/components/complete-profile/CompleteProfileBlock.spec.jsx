import { vi } from 'vitest'
import { screen, fireEvent } from '@testing-library/react'
import CompleteProfileBlock from '~/components/complete-profile/CompleteProfileBlock'
import {
  profileItemsTutor,
  profileItemsStudent
} from '~/components/profile-item/complete-profile.constants'
import { renderWithProviders } from '~tests/test-utils'
import useAxios from '~/hooks/use-axios'

vi.mock('~/hooks/use-axios')
vi.mock('~/services/offer-service')

const badRoute = '/tutor/myProfile'

const mockDataFilled = {
  photo: 'some-photo',
  address: 'some-address',
  mainSubjects: {
    student: ['subject1']
  },
  professionalBlock: {
    awards: '',
    scientificActivities: 'some-activities',
    workExperience: '',
    education: ''
  },
  videoLink: {
    tutor: 'some-videolink'
  }
}

const mockDataEmpty = {
  mainSubjects: {
    student: ''
  },
  professionalBlock: {
    awards: '',
    scientificActivities: '',
    workExperience: '',
    education: ''
  },
  videoLink: {
    tutor: '',
    student: ''
  }
}

describe('CompleteProfile test when user data is filled', () => {
  beforeEach(() => {
    useAxios.mockReturnValue({
      response: { items: ['item1'], count: 1 },
      loading: false
    })
  })

  it('Progress bar value should be 100 for student (filled)', () => {
    renderWithProviders(
      <CompleteProfileBlock
        data={mockDataFilled}
        profileItems={profileItemsStudent}
      />,
      {
        initialEntries: badRoute,
        preloadedState: { appMain: { userRole: 'student' } }
      }
    )

    const progressBar = screen.getByRole('progressbar')
    expect(progressBar).toHaveAttribute('aria-valuenow', '100')
  })

  it('Progress bar value should be 80 for tutor (filled)', () => {
    renderWithProviders(
      <CompleteProfileBlock
        data={mockDataFilled}
        profileItems={profileItemsTutor}
      />,
      {
        initialEntries: badRoute,
        preloadedState: { appMain: { userRole: 'tutor' } }
      }
    )

    const progressBar = screen.getByRole('progressbar')
    expect(progressBar).toHaveAttribute('aria-valuenow', '80')
  })
})

describe('CompleteProfile test when user data is empty', () => {
  beforeEach(() => {
    useAxios.mockReturnValue({
      response: { items: [], count: 0 },
      loading: false
    })
  })

  it('Progress bar value should be 0 for student (empty)', () => {
    renderWithProviders(
      <CompleteProfileBlock
        data={mockDataEmpty}
        profileItems={profileItemsStudent}
      />,
      {
        initialEntries: badRoute,
        preloadedState: { appMain: { userRole: 'student' } }
      }
    )

    const progressBar = screen.getByRole('progressbar')
    expect(progressBar).toHaveAttribute('aria-valuenow', '0')
  })

  it('Progress bar value should be 0 for tutor (empty)', () => {
    renderWithProviders(
      <CompleteProfileBlock
        data={mockDataEmpty}
        profileItems={profileItemsTutor}
      />,
      {
        initialEntries: badRoute,
        preloadedState: { appMain: { userRole: 'tutor' } }
      }
    )

    const progressBar = screen.getByRole('progressbar')
    expect(progressBar).toHaveAttribute('aria-valuenow', '0')
  })
})

describe('CompleteProfile test ui', () => {
  it('Check button less or more for tutor', () => {
    renderWithProviders(
      <CompleteProfileBlock
        data={mockDataEmpty}
        profileItems={profileItemsTutor}
      />,
      {
        initialEntries: badRoute,
        preloadedState: { appMain: { userRole: 'tutor' } }
      }
    )
    const lessOrMoreButton = screen.getByTestId('showOrHide')
    const moreIcon = screen.getByTestId('icon-more')
    expect(moreIcon).toBeInTheDocument()

    fireEvent.click(lessOrMoreButton)

    const lessIcon = screen.getByTestId('icon-less')
    expect(lessIcon).toBeInTheDocument()
  })

  it('Check button less or more for student', () => {
    renderWithProviders(
      <CompleteProfileBlock
        data={mockDataEmpty}
        profileItems={profileItemsStudent}
      />,
      {
        initialEntries: badRoute,
        preloadedState: { appMain: { userRole: 'student' } }
      }
    )
    const lessOrMoreButton = screen.getByTestId('showOrHide')
    const moreIcon = screen.getByTestId('icon-more')
    expect(moreIcon).toBeInTheDocument()

    fireEvent.click(lessOrMoreButton)

    const lessIcon = screen.getByTestId('icon-less')
    expect(lessIcon).toBeInTheDocument()
  })
})
