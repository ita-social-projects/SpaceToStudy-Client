import { fireEvent, screen, waitFor } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'

import CourseSectionsList from '~/containers/course-sections-list/CourseSectionsList'
import AddCourseTemplateModal from '~/containers/cooperation-details/add-course-modal-modal/AddCourseTemplateModal'

import { ResourcesTypesEnum as ResourceType } from '~/types'

const mockedHandleSectionChange = vi.fn()
const mockedResourceEventHandler = vi.fn()
const mockedSectionEventHandler = vi.fn()

const mockedCourseSectionData = Array(5)
  .fill()
  .map((_, index) => ({
    id: `${index + 1}`,
    title: `Title ${index + 1}`,
    description: `Description ${index + 1}`,
    resources: [
      {
        resource: {
          availability: {
            status: 'open',
            date: null
          },
          _id: '64cd12f1fad091e0sfe12134',
          title: 'Lesson1',
          author: 'some author',
          content: 'Content',
          description: 'Description',
          attachments: [],
          category: null
        },
        resourceType: ResourceType.Lesson
      },
      {
        resource: {
          availability: {
            status: 'open',
            date: null
          },
          _id: '64fb2c33eba89699411d22bb',
          title: 'Quiz',
          description: '',
          items: [],
          author: '648afee884936e09a37deaaa',
          category: { id: '64fb2c33eba89699411d22bb', name: 'Music' },
          createdAt: '2023-09-08T14:14:11.373Z',
          updatedAt: '2023-09-08T14:14:11.373Z'
        },
        resourceType: ResourceType.Quiz
      },
      {
        resource: {
          availability: {
            status: 'open',
            date: null
          },
          _id: '64cd12f1fad091e0ee719830',
          author: '6494128829631adbaf5cf615',
          fileName: 'spanish.pdf',
          link: 'link',
          category: { id: '64fb2c33eba89699411d22bb', name: 'History' },
          description: 'Mock description for attachments',
          size: 100,
          createdAt: '2023-07-25T13:12:12.998Z',
          updatedAt: '2023-07-25T13:12:12.998Z'
        },
        resourceType: ResourceType.Attachment
      }
    ]
  }))

vi.mock(
  '~/containers/cooperation-details/add-course-modal-modal/AddCourseTemplateModal',
  async () => {
    const actual = await vi.importActual(
      '~/containers/cooperation-details/add-course-modal-modal/AddCourseTemplateModal'
    )
    return {
      ...actual,
      AddCourseTemplateModal: (props) => {
        return (
          <div data-testid='mock-AddCourseTemplateModal' {...props}>
            {props.children}
          </div>
        )
      }
    }
  }
)

vi.mock('@dnd-kit/core', async () => {
  const actual = await vi.importActual('@dnd-kit/core')
  return {
    ...actual,
    DndContext: ({ children }) => {
      return <div data-testid='dnd-context-mock'>{children}</div>
    }
  }
})

vi.mock('~/hooks/use-droppable', () => {
  return {
    default: () => ({ enabled: true })
  }
})

const openModalMock = vi.fn()
vi.mock('~/context/modal-context', async (importOriginal) => {
  const mod = await importOriginal()
  return {
    ...mod,
    useModalContext: () => ({
      openModal: openModalMock
    })
  }
})

const openMenuMock = vi.fn()
const closeMenuMock = vi.fn()
const renderMenuMock = vi.fn()
vi.mock('~/hooks/use-menu', async (importOriginal) => {
  const mod = await importOriginal()
  return {
    ...mod,
    useMenu: () => ({
      anchorEl: false,
      openMenu: openMenuMock,
      closeMenu: closeMenuMock,
      renderMenu: renderMenuMock
    })
  }
})

describe('CourseSectionsList tests', () => {
  beforeEach(async () => {
    await waitFor(() => {
      renderWithProviders(
        <CourseSectionsList
          handleSectionInputChange={mockedHandleSectionChange}
          isCooperation
          items={mockedCourseSectionData}
          resourceEventHandler={mockedResourceEventHandler}
          sectionEventHandler={mockedSectionEventHandler}
        />
      )
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should render the list of section items when items is not empty', () => {
    mockedCourseSectionData.forEach((section) => {
      const sectionTitle = screen.getByDisplayValue(section.title)
      const sectionDescription = screen.getByDisplayValue(section.description)
      expect(sectionTitle).toBeInTheDocument()
      expect(sectionDescription).toBeInTheDocument()
    })
  })

  it('should delete module from the list', () => {
    const menuButton = screen.getAllByTestId('MoreVertIcon')[0]
    waitFor(() => fireEvent.click(menuButton))
    const deleteMenuButton = screen.getByTestId('DeleteOutlineIcon')
    expect(deleteMenuButton).toBeInTheDocument()
    waitFor(() => fireEvent.click(deleteMenuButton))
    expect(mockedSectionEventHandler).toHaveBeenCalledWith({
      sectionId: '1',
      type: 'sectionRemoved'
    })
  })

  it('should render cooperation menu on click "Add activity"', () => {
    const itemIndex = 1
    const addActivityButton = screen.getAllByTestId('Add activity')[itemIndex]
    expect(addActivityButton).toBeInTheDocument()
    waitFor(() => fireEvent.click(addActivityButton))
    const addModuleButton = screen.getAllByTestId('Crop75Icon')[itemIndex]
    expect(addModuleButton).toBeInTheDocument()
    const addCourseTemplateButton = screen.getAllByTestId(
      'ViewComfyOutlinedIcon'
    )[itemIndex]
    expect(addCourseTemplateButton).toBeInTheDocument()
  })

  it('should open "AddCourseTemplateModal" when "Course template" is clicked in the "Add activity" menu', () => {
    const itemIndex = 2
    const addActivityButton = screen.getAllByTestId('Add activity')[itemIndex]
    waitFor(() => fireEvent.click(addActivityButton))
    const addCourseTemplateButton = screen.getAllByTestId(
      'ViewComfyOutlinedIcon'
    )[itemIndex]
    waitFor(() => fireEvent.click(addCourseTemplateButton))
    expect(openModalMock).toHaveBeenCalled()
    expect(openModalMock).toHaveBeenCalledWith(
      expect.objectContaining({
        component: <AddCourseTemplateModal />
      })
    )
  })

  it('should call event handler with proper type when "Module" is clicked in the "Add activity" menu', () => {
    const itemIndex = 1
    const addActivityButton = screen.getAllByTestId('Add activity')[itemIndex]
    waitFor(() => fireEvent.click(addActivityButton))
    const addModuleButton = screen.getAllByTestId('Crop75Icon')[itemIndex]
    waitFor(() => fireEvent.click(addModuleButton))
    expect(mockedSectionEventHandler).toHaveBeenCalledWith({
      index: 1,
      type: 'sectionAdded'
    })
  })
})

describe('CourseSectionsList test when prop items is empty', () => {
  beforeEach(async () => {
    await waitFor(() => {
      renderWithProviders(
        <CourseSectionsList
          handleSectionInputChange={mockedHandleSectionChange}
          isCooperation
          items={[]}
          resourceEventHandler={mockedResourceEventHandler}
          sectionEventHandler={mockedSectionEventHandler}
        />
      )
    })
  })

  it('should render clearCooperationMenu when items is empty', () => {
    const addActivityButton = screen.getByTestId('Add activity')
    const createButton = screen.getByText('cooperationsPage.button.create')
    expect(addActivityButton).toBeInTheDocument()
    expect(createButton).toBeInTheDocument()
  })
})
