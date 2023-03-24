import { URLs } from '~/constants/request'
import MockAdapter from 'axios-mock-adapter'
import { axiosClient } from '~/plugins/axiosClient'
import { screen, fireEvent } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import ExploreSubjects from '~/containers/subjects-page/explore-subjects/ExploreSubjects'

const mockAxiosClient = new MockAdapter(axiosClient)
const categoriesData = [{ id: '1', name: 'Language' }]
const subjectsData = [{ id: '1', name: 'Ukrainian' }]

describe('ExploreSubjects component', () => {
  beforeEach(async () => {
    mockAxiosClient.onGet(URLs.categories.get).reply(200, categoriesData)
    mockAxiosClient.onGet(URLs.subjects.get).reply(200, subjectsData)

    renderWithProviders(<ExploreSubjects />)
  })
  it('renders the component with expected elements', async () => {
    expect(screen.getByText('subjectsPage.subjects.title')).toBeInTheDocument()
    expect(screen.getByText('subjectsPage.subjects.description')).toBeInTheDocument()
    expect(screen.getByText('subjectsPage.subjects.backToAllCategories')).toBeInTheDocument()
    expect(screen.getByText('subjectsPage.subjects.showAllOffers')).toBeInTheDocument()
    expect(screen.getByLabelText('Categories')).toBeInTheDocument()
    expect(screen.getByText('subjectsPage.subjects.searchBtn')).toBeInTheDocument()
  })
  it('should change category', () => {
    const searchInput = screen.getAllByRole('combobox')[0]

    fireEvent.change(searchInput, { target: { value: 'Langua' } })
    fireEvent.keyDown(searchInput, { key: 'ArrowDown' })
    fireEvent.keyDown(searchInput, { key: 'Enter' })

    expect(searchInput.value).toBe('Language')
  })
})
