import { screen, fireEvent, waitFor } from '@testing-library/react'
import { renderWithProviders, mockAxiosClient } from '~tests/test-utils'
import { beforeEach, describe } from 'vitest'

import EditAttachmentModal from '~/containers/my-resources/edit-attachment-modal/EditAttachmentModal'
import { URLs } from '~/constants/request'

const closeModalMock = vi.fn()
const updateAttachment = vi.fn()

const categoriesNamesMock = [
  { _id: '650c27618a9fbf234b8bb4cf', name: 'New category in resources!' },
  { _id: '650c27618a9fbf234b8bb4cd', name: 'Category 1' }
]

const attachmentMock = {
  _id: '651eb01561e2ac6d2995b76c',
  author: '648afee884936e09a37deaaa',
  fileName: 'Doc13.pdf',
  link: '1696522954946-Doc13.pdf',
  size: 144293,
  createdAt: '2023-10-05T12:46:13.081Z',
  updatedAt: '2023-10-05T16:22:35.063Z',
  description: 'dsdsdsds',
  category: categoriesNamesMock[0]
}

describe('EditAttachmentModal component', () => {
  beforeEach(async () => {
    await waitFor(() => {
      mockAxiosClient
        .onGet(URLs.resources.resourcesCategories.getNames)
        .reply(200, categoriesNamesMock)

      renderWithProviders(
        <EditAttachmentModal
          attachment={attachmentMock}
          closeModal={closeModalMock}
          updateAttachment={updateAttachment}
        />
      )
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
    mockAxiosClient.reset()
  })

  it('should render title', () => {
    const title = screen.getByText('myResourcesPage.attachments.edit')
    expect(title).toBeInTheDocument()
  })

  it('should render save button and click on it', () => {
    const saveBtn = screen.getByText('common.save')

    expect(saveBtn).toBeInTheDocument()

    waitFor(() => {
      fireEvent.click(saveBtn)
    })

    expect(updateAttachment).toHaveBeenCalled()
  })

  it('should change category', async () => {
    const autocomplete = await screen.findByRole('combobox')

    expect(autocomplete).toBeInTheDocument()

    waitFor(() => {
      fireEvent.click(autocomplete)
      fireEvent.change(autocomplete, {
        target: { value: categoriesNamesMock[1].name }
      })
      fireEvent.keyDown(autocomplete, { key: 'ArrowDown' })
      fireEvent.keyDown(autocomplete, { key: 'Enter' })
    })

    expect(autocomplete.value).toBe(categoriesNamesMock[1].name)
  })
})
