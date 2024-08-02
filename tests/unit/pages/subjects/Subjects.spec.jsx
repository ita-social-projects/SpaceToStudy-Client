import { vi } from 'vitest'
import Subjects from '~/pages/subjects/Subjects'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'

vi.mock('~/hooks/use-categories-names', () => ({
  __esModule: true,
  default: () => ({
    loading: false,
    response: [
      { _id: '123', name: 'Category 1' },
      { _id: '456', name: 'Category 2' },
      { _id: '789', name: '' }
    ]
  })
}))

vi.mock('~/hooks/use-subjects-names', () => ({
  __esModule: true,
  default: () => ({
    loading: false,
    response: ['Subject 1', 'Subject 2']
  })
}))

const route = '/categories/subjects?categoryId=123'

const mockState = {
  appMain: { userRole: 'tutor' }
}

describe('Subjects', () => {
  beforeEach(async () => {
    await waitFor(() => {
      renderWithProviders(<Subjects />, {
        initialEntries: route,
        preloadedState: mockState
      })
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should render correctly', () => {
    expect(
      screen.getByText('subjectsPage.subjects.description')
    ).toBeInTheDocument()
    expect(
      screen.getByText('subjectsPage.subjects.title', {
        category: 'Category 1'
      })
    ).toBeInTheDocument()
    expect(screen.getByLabelText('breadCrumbs.categories')).toBeInTheDocument()
    expect(
      screen.getByLabelText('subjectsPage.subjects.searchLabel')
    ).toBeInTheDocument()
    expect(
      screen.getByText('subjectsPage.subjects.backToAllCategories')
    ).toBeInTheDocument()
    expect(
      screen.getByText('subjectsPage.subjects.showAllOffers')
    ).toBeInTheDocument()
  })

  it('should update search value when search input is changed', () => {
    const searchLabel = screen.getByLabelText(
      'subjectsPage.subjects.searchLabel'
    )

    fireEvent.change(searchLabel, { target: { value: 'Subject' } })

    const subject = screen.getByDisplayValue('Subject')

    expect(subject).toBeInTheDocument()
  })

  it('should change autocomplete', () => {
    const autocomplete = screen.getByLabelText('breadCrumbs.categories')

    expect(autocomplete).toBeInTheDocument()

    fireEvent.click(autocomplete)
    fireEvent.change(autocomplete, { target: { value: 'Category 2' } })
    fireEvent.keyDown(autocomplete, { key: 'ArrowDown' })
    fireEvent.keyDown(autocomplete, { key: 'Enter' })

    expect(autocomplete.value).toBe('Category 2')
  })

  it('should clear autocomplete', () => {
    const autocomplete = screen.getByLabelText('breadCrumbs.categories')

    fireEvent.click(autocomplete)
    fireEvent.change(autocomplete, { target: { value: '' } })
    fireEvent.keyDown(autocomplete, { key: 'ArrowDown' })
    fireEvent.keyDown(autocomplete, { key: 'Enter' })

    expect(autocomplete.value).toBe('')
  })

  it('should display NotFoundResults when there are no subjects and loading is false', async () => {
    vi.mock('~/hooks/use-subjects-names', () => ({
      __esModule: true,
      default: () => ({
        loading: false,
        response: []
      })
    }))

    renderWithProviders(<Subjects />, {
      initialEntries: route,
      preloadedState: mockState
    })

    await waitFor(() => {
      expect(screen.getByText('errorMessages.tryAgainText')).toBeInTheDocument()
    })
  })
})
