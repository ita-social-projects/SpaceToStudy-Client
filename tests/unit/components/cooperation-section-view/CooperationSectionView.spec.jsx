import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import CooperationSectionView from '~/components/cooperation-section-view/CooperationSectionView'
import {
  ResourcesTypesEnum as ResourceType,
  ResourcesAvailabilityEnum
} from '~/types'
import { useAppSelector } from '~/hooks/use-redux'

const navigateMock = vi.fn()

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => navigateMock
}))

vi.mock('~/hooks/use-redux', () => ({
  useAppSelector: vi.fn()
}))

describe('CooperationSectionView', () => {
  const mockSection = {
    title: 'QuizzesTitle',
    description: 'Quizzes',
    resources: [
      {
        resource: {
          id: '662ba5f9f3edc14ca7b2336f',
          title: 'The newest',
          description:
            'The newestThe newestThe newestThe newestThe newestThe newestThe newest',
          items: ['656609af8a848ff2202df8d5'],
          author: '6565fc5a8a848ff2202df766',
          category: '656609518a848ff2202df8b7',
          resourceType: ResourceType.Quiz,
          settings: {
            view: 'Scroll',
            shuffle: true,
            pointValues: true,
            scoredResponses: true,
            correctAnswers: true
          },
          availability: {
            status: 'open',
            date: '1234'
          }
        },
        resourceType: ResourceType.Quiz
      }
    ],
    _id: '6632264063eb69afaf165c61'
  }

  beforeEach(() => {
    useAppSelector.mockReturnValue(ResourcesAvailabilityEnum.OpenManually)
    render(<CooperationSectionView item={mockSection} />)
  })

  it('should render resource title', () => {
    const title = screen.getByText(mockSection.resources[0].resource.title)
    
    expect(title).toBeInTheDocument()
  })

  it('should navigate to cooperation', () => {
    const resourceItem = screen.getByText(
      mockSection.resources[0].resource.title
    )
    fireEvent.click(resourceItem)

    waitFor(() => expect(navigateMock).toHaveBeenCalled())
  })
})
