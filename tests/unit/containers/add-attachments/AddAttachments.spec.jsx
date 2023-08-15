import { screen } from '@testing-library/react'
import AddAttachments from '~/containers/add-attachments/AddAttachments'
import { mockAxiosClient, renderWithProviders } from '~tests/test-utils'
import { URLs } from '~/constants/request'
import { defaultResponses } from '~/constants'

describe('AddAttachments', () => {
  mockAxiosClient
    .onGet(URLs.resources.attachments.get)
    .reply(200, defaultResponses.itemsWithCount)

  it('should render the component', () => {
    renderWithProviders(<AddAttachments />)

    const addAttachments = screen.getByText(
      'myResourcesPage.attachments.addFromAttachments'
    )

    expect(addAttachments).toBeInTheDocument()
  })
})