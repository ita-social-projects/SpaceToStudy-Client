import { fireEvent, screen } from '@testing-library/react'
import { renderWithProviders, mockAxiosClient } from '~tests/test-utils'
import { URLs } from '~/constants/request'
import LessonDetails from '~/pages/lesson-details/LessonDetails'

const lessonId = '64ef41f7806a06c65338c433'

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useParams: () => ({
      id: lessonId
    })
  }
})
const userId = '63f5d0ebb'

const mockState = {
  appMain: { userId: userId, userRole: 'tutor' }
}
const lessonMock = {
  _id: lessonId,
  author: '6477007a6fa4d05e1a800ce5',
  title: 'Quantum Mechanics: Mathematical Formulations - Part 1',
  description:
    'The mathematical language of quantum mechanics will become your ally as we explore the formalism of quantum mechanics. . You will become adept at working with state vectors, operators, and observables, gaining a deep understanding.',
  attachments: [
    {
      _id: '64e890625757da9cc83a13fc',
      author: '6477007a6fa4d05e1a800ce5',
      fileName: 'file1.png',
      link: '1692962913878-animation-23.png',
      size: 763774,
      createdAt: '2023-08-25T11:28:34.397Z',
      updatedAt: '2023-08-25T11:28:34.397Z'
    },
    {
      _id: '64dcbb2ce04abdca4434c813',
      author: '6477007a6fa4d05e1a800ce5',
      fileName: 'file2.jpeg',
      link: '1692187436676-1366_2000.jpeg',
      size: 104764,
      createdAt: '2023-08-16T12:03:56.773Z',
      updatedAt: '2023-08-16T12:03:56.773Z'
    }
  ]
}

describe('LessonDetails', () => {
  beforeEach(() => {
    renderWithProviders(<LessonDetails />, { preloadedState: mockState })
    mockAxiosClient
      .onGet(`${URLs.resources.lessons.get}/${lessonId}`)
      .reply(200, lessonMock)
  })

  it('should render page with title and description fields', async () => {
    const title = await screen.findByText(lessonMock.title)
    const description = await screen.findByText(lessonMock.description)

    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
  })

  it('should open content', async () => {
    const title = await screen.findByText('lesson.attachments')

    fireEvent.click(title)

    const attachment = screen.getByText('file1.png')
    expect(title).toBeInTheDocument()
    expect(attachment).toBeInTheDocument()
  })
})
