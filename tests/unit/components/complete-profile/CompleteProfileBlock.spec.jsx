import { vi } from 'vitest'
import { screen, fireEvent } from '@testing-library/react'
import CompleteProfileBlock from '~/components/complete-profile/CompleteProfileBlock'
import {
  profileItemsTutor,
  profileItemsStudent
} from '~/components/profile-item/complete-profile.constants'
import { renderWithProviders } from '~tests/test-utils'
import useAxios from '~/hooks/use-axios'
import { OfferService } from '~/services/offer-service'

vi.mock('~/hooks/use-axios')
vi.mock('~/services/offer-service')

const badRoute = '/tutor/myProfile'

const mockDataFilled = {
  photo: 'blabla',
  address: 'blabla',
  mainSubjects: {
    student: ['blabla']
  },
  professionalBlock: {
    bla: 'blabla',
    blatwo: ''
  },
  videoLink: {
    tutor: 'blabla'
  }
}

const mockDataEmpty = {
  mainSubjects: {
    student: ''
  },
  professionalBlock: {
    bla: '',
    blatwo: ''
  }
}

describe('CompleteProfile test when user data is filled', () => {
  beforeEach(() => {
    useAxios.mockReturnValue({
      response: { items: [{ bla: 'blabla' }] },
      loading: false
    })

    OfferService.getUsersOffers.mockReturnValue({ items: [{ bla: 'blabla' }] })
  })

  it('Progress bar value should be 100 for student (filled)', () => {
    renderWithProviders(
      <CompleteProfileBlock
        data={mockDataFilled}
        profileItems={profileItemsStudent}
        role='student'
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
        role='tutor'
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
      response: { items: [] },
      loading: false
    })

    OfferService.getUsersOffers.mockReturnValue({ items: [] })
  })

  it('Progress bar value should be 0 for student (empty)', () => {
    renderWithProviders(
      <CompleteProfileBlock
        data={mockDataEmpty}
        profileItems={profileItemsStudent}
        role='student'
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
        role='tutor'
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
        role='tutor'
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
        role='student'
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
