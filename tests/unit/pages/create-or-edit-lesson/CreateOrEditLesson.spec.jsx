import { fireEvent, screen, waitFor } from '@testing-library/react'
import { renderWithProviders, mockAxiosClient } from '~tests/test-utils'

import CreateOrEditLesson from '~/pages/create-or-edit-lesson/CreateOrEditLesson'
import { URLs } from '~/constants/request'

const categoriesNamesMock = [
  { _id: '650c27618a9fbf234b8bb4cf', name: 'New category in resources!' },
  { _id: '650c27618a9fbf234b8bb4cd', name: 'Category 1' }
]

describe('CreateOrEditLesson component test', () => {
  mockAxiosClient
    .onGet(URLs.resources.resourcesCategories.getNames)
    .reply(200, categoriesNamesMock)

  beforeEach(() => {
    renderWithProviders(<CreateOrEditLesson />)
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

    fireEvent.click(addedAttachment)

    const title = screen.getByText('myResourcesPage.attachments.add')

    expect(title).toBeInTheDocument()
  })

  it('display validation error if title or description is empty', () => {
    const titleInput = screen.getByLabelText('lesson.labels.title')

    fireEvent.change(titleInput, { target: { value: '' } })

    const descriptionInput = screen.getByLabelText('lesson.labels.description')

    fireEvent.change(descriptionInput, { target: { value: '' } })

    const saveButton = screen.getByText('common.save')

    fireEvent.click(saveButton)

    const errorTitle = screen.getByText('lesson.errorMessages.title')

    expect(errorTitle).toBeInTheDocument()

    const errorDescription = screen.getByText(
      'lesson.errorMessages.description'
    )

    expect(errorDescription).toBeInTheDocument()
  })

  it('should choose the category from options list', async () => {
    const autocomplete = screen.getByRole('combobox')

    expect(autocomplete).toBeInTheDocument()
    expect(autocomplete.value).toBe('')

    fireEvent.click(autocomplete)
    fireEvent.focus(autocomplete)

    fireEvent.change(autocomplete, {
      target: { value: categoriesNamesMock[1].name }
    })

    fireEvent.keyDown(autocomplete, { key: 'ArrowDown' })
    fireEvent.keyDown(autocomplete, { key: 'Enter' })

    await waitFor(() => {
      expect(autocomplete.value).toBe(categoriesNamesMock[1].name)
    })

    fireEvent.keyDown(autocomplete, { key: 'ArrowDown' })
    fireEvent.keyDown(autocomplete, { key: 'Enter' })

    expect(autocomplete.value).toBe(categoriesNamesMock[1].name)
  })

  it('should click on "add button" in options list', async () => {
    const autocomplete = screen.getByRole('combobox')

    fireEvent.click(autocomplete)
    fireEvent.focus(autocomplete)

    fireEvent.keyDown(autocomplete, { key: 'ArrowDown' })

    await waitFor(() => {
      const addButton = screen.queryByText('myResourcesPage.categories.addBtn')

      fireEvent.click(addButton)
    })

    await waitFor(() => {
      const newCategory = screen.getByText('myResourcesPage.categories.name')

      expect(newCategory).toBeInTheDocument()
    })
  })
})
