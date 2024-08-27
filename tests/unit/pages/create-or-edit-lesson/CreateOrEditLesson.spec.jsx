import { fireEvent, screen, waitFor } from '@testing-library/react'

import { ResourcesTypesEnum as ResourceType } from '~/types'
import {
  mockAxiosClient,
  renderWithProviders,
  TestSnackbar
} from '~tests/test-utils'
import { URLs } from '~/constants/request'
import { createUrlPath } from '~/utils/helper-functions'
import { authRoutes } from '~/router/constants/authRoutes'

import CreateOrEditLesson from '~/pages/create-or-edit-lesson/CreateOrEditLesson'

const mockNavigate = vi.fn()
const mockedCategory = { _id: 'categoryId', name: 'categoryName' }

const mockedAttachment = {
  availability: {
    status: 'open',
    date: null
  },
  _id: 'id',
  author: 'authorId',
  fileName: 'test.pdf',
  link: '1722535882408-test.pdf',
  size: 15069,
  category: null,
  resourceType: ResourceType.Attachment,
  createdAt: '2024-08-01T18:11:23.042Z',
  updatedAt: '2024-08-01T18:11:23.042Z'
}

const mockedAttachmentsResponse = {
  count: 1,
  items: [mockedAttachment]
}

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => mockNavigate
}))

describe('CreateOrEditLesson component test', () => {
  beforeAll(() => {
    mockAxiosClient
      .onGet(URLs.resources.attachments.get)
      .reply(200, mockedAttachmentsResponse)

    mockAxiosClient
      .onGet(URLs.resources.resourcesCategories.getNames)
      .reply(200, [mockedCategory])
  })

  beforeEach(async () => {
    await waitFor(() =>
      renderWithProviders(
        <TestSnackbar>
          <CreateOrEditLesson />
        </TestSnackbar>
      )
    )
  })

  it('should render page with title and description fields', () => {
    const titleInput = screen.getByLabelText('lesson.labels.title')

    const descriptionInput = screen.getByLabelText('lesson.labels.description')

    expect(titleInput).toBeInTheDocument()

    expect(descriptionInput).toBeInTheDocument()
  })

  it('should add attachments', () => {
    const addedAttachment = screen.getByText('lesson.labels.attachments')

    expect(addedAttachment).toBeInTheDocument()

    waitFor(() => fireEvent.click(addedAttachment))

    const title = screen.getByText('myResourcesPage.attachments.add')

    expect(title).toBeInTheDocument()
  })

  it('should show a snackbar with an error', async () => {
    const fakeError = { code: 'errorCode', message: 'errorMessage' }
    mockAxiosClient.onPost(URLs.resources.lessons.add).reply(400, fakeError)
    const titleInput = screen.getByLabelText('lesson.labels.title')
    const descriptionInput = screen.getByLabelText('lesson.labels.description')
    const submitBtn = screen.getByText('common.save')

    fireEvent.change(titleInput, { target: { value: 'title' } })
    fireEvent.change(descriptionInput, { target: { value: 'description' } })
    fireEvent.click(submitBtn)

    const snackbar = await screen.findByText(`errors.${fakeError.code}`)

    expect(snackbar).toBeInTheDocument()
  })

  it('should show a snackbar with an unknown error', async () => {
    mockAxiosClient.onPost(URLs.resources.lessons.add).reply(400, null)
    const titleInput = screen.getByLabelText('lesson.labels.title')
    const descriptionInput = screen.getByLabelText('lesson.labels.description')
    const submitBtn = screen.getByText('common.save')

    fireEvent.change(titleInput, { target: { value: 'title' } })
    fireEvent.change(descriptionInput, { target: { value: 'description' } })
    fireEvent.click(submitBtn)

    const snackbar = await screen.findByText(`errors.UNKNOWN_ERROR`)

    expect(snackbar).toBeInTheDocument()
  })

  it('should navigate to the lessons tab', async () => {
    fireEvent.click(screen.getByText('common.cancel'))

    expect(mockNavigate).toHaveBeenCalledWith(
      createUrlPath(authRoutes.myResources.root.path, '', { tab: 'lessons' })
    )
  })

  it('should create a new lesson', async () => {
    mockAxiosClient.onPost(URLs.resources.lessons.add).reply(200)
    const titleInput = screen.getByLabelText('lesson.labels.title')
    const descriptionInput = screen.getByLabelText('lesson.labels.description')
    const submitBtn = screen.getByText('common.save')

    fireEvent.change(titleInput, { target: { value: 'title' } })
    fireEvent.change(descriptionInput, { target: { value: 'description' } })
    fireEvent.click(submitBtn)

    const snackbar = await screen.findByText('lesson.successAddedLesson')

    expect(snackbar).toBeInTheDocument()
  })

  it('should add an attachment', async () => {
    mockAxiosClient
      .onGet(URLs.resources.attachments.get)
      .reply(200, mockedAttachmentsResponse)
    const attachmentsBtn = screen.getByRole('button', {
      name: 'lesson.labels.attachments'
    })
    fireEvent.click(attachmentsBtn)

    const attachment = await screen.findByText(mockedAttachment.fileName)
    fireEvent.click(attachment)

    const addBtn = screen.getByText('common.add')
    fireEvent.click(addBtn)

    const addedAttachment = screen.getByText(mockedAttachment.fileName)

    expect(addedAttachment).toBeInTheDocument()
  })

  it('should remove an attachment', async () => {
    mockAxiosClient
      .onGet(URLs.resources.attachments.get)
      .reply(200, mockedAttachmentsResponse)
    const attachmentsBtn = screen.getByRole('button', {
      name: 'lesson.labels.attachments'
    })
    fireEvent.click(attachmentsBtn)

    const attachment = await screen.findByText(mockedAttachment.fileName)
    fireEvent.click(attachment)

    const addBtn = screen.getByText('common.add')
    fireEvent.click(addBtn)

    let addedAttachment = screen.getByText(mockedAttachment.fileName)
    expect(addedAttachment).toBeInTheDocument()

    const removeAttachmentBtn = screen.getByTestId('CloseIcon')
    fireEvent.click(removeAttachmentBtn)

    addedAttachment = screen.queryByText(mockedAttachment.fileName)
    expect(addedAttachment).not.toBeInTheDocument()
  })

  it('should change a category', async () => {
    const categoryInput = screen.getByLabelText(
      'myResourcesPage.categories.categoryDropdown'
    )
    fireEvent.mouseDown(categoryInput)

    const category = screen.getByText(mockedCategory.name)
    fireEvent.click(category)

    const chosenCategory = screen.getByRole('combobox', {
      value: mockedCategory.name
    })

    expect(chosenCategory).toBeInTheDocument()
  })
})
