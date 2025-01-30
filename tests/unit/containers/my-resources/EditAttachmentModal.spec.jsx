import { screen, fireEvent, waitFor } from '@testing-library/react'
import { renderWithProviders, mockAxiosClient } from '~tests/test-utils'
import { beforeEach, describe, expect } from 'vitest'

import EditAttachmentModal from '~/containers/my-resources/edit-attachment-modal/EditAttachmentModal'
import { URLs } from '~/constants/request'

const closeModalMock = vi.fn()
const updateAttachment = vi.fn()

const categoriesNamesMock = {
  WEB_DEVELOPMENT :{ _id: '650c27618a9fbf234b8bb4cf', name: 'Web development' },
  MOTION_DESIGN :{ _id: '650c27618a9fbf234b8bb4cd', name: 'Motion design' }
}

const attachmentMock = {
  _id: '651eb01561e2ac6d2995b76c',
  author: '648afee884936e09a37deaaa',
  fileName: 'Doc13.pdf',
  link: '1696522954946-Doc13.pdf',
  size: 144293,
  createdAt: '2023-10-05T12:46:13.081Z',
  updatedAt: '2023-10-05T16:22:35.063Z',
  description: 'dsdsdsds',
  category: categoriesNamesMock.WEB_DEVELOPMENT.name
}

const selectCategory = (autocomplete, categoryName) => {
  fireEvent.click(autocomplete)
  fireEvent.change(autocomplete, {
    target: { value: categoryName }
  })
  fireEvent.keyDown(autocomplete, { key: 'ArrowDown' })
  fireEvent.keyDown(autocomplete, { key: 'Enter' })
}

describe('EditAttachmentModal component', () => {
  beforeEach(() => {
      mockAxiosClient
        .onGet(URLs.resources.resourcesCategories.getNames)
        .reply(200, [categoriesNamesMock.WEB_DEVELOPMENT, categoriesNamesMock.MOTION_DESIGN])

      renderWithProviders(
        <EditAttachmentModal
          attachment={attachmentMock}
          closeModal={closeModalMock}
          onAttachmentUpdate={updateAttachment}
        />
      )
  })

  afterEach(() => {
    vi.clearAllMocks()
    mockAxiosClient.reset()
  })

  it('should render title', () => {
    const title = screen.getByText('myResourcesPage.attachments.edit')
    expect(title).toBeInTheDocument()
  })

  it('should render disabled save button by default', () => {
    const saveBtn = screen.getByText('common.save')

    expect(saveBtn).toBeInTheDocument()

    fireEvent.click(saveBtn)

    expect(updateAttachment).not.toHaveBeenCalled()
  })

  it('should call updateAttachment when save button is clicked after changing attachment data', async () => {
    const saveBtn = screen.getByText('common.save')
    const autocomplete = await screen.findByRole('combobox')

    expect(autocomplete).toBeInTheDocument()

    await waitFor(() => {
      selectCategory(autocomplete, categoriesNamesMock.MOTION_DESIGN.name)
    })

    fireEvent.click(saveBtn)

    expect(updateAttachment).toHaveBeenCalled()
  })

  it('should change category', async () => {
    const autocomplete = await screen.findByRole('combobox')

    expect(autocomplete).toBeInTheDocument()

    await waitFor(() => {
      selectCategory(autocomplete, categoriesNamesMock.MOTION_DESIGN.name)
    })

    expect(autocomplete.value).toBe(categoriesNamesMock.MOTION_DESIGN.name)
  })
})
