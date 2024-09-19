import { screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'

import SidebarGroupedContent from '~/containers/chat/sidebar-grouped-content/SidebarGroupedContent'

import { getFormattedDate } from '~/utils/helper-functions'
import { SidebarContentEnum } from '~/types'

const mockFiles = [
  {
    _id: 'f1',
    name: 'Cool book.pdf',
    size: 13.4,
    createdAt: '2023-08-24T11:16:06.685Z',
    updatedAt: '2023-08-24T11:16:06.685Z',
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  }
]

const mockState = {
  appMain: { userId: '644e6b1778cc37f543f2f37c' }
}

describe('SidebarGroupedContent', () => {
  it('should render files with date', () => {
    renderWithProviders(
      <SidebarGroupedContent
        items={mockFiles}
        type={SidebarContentEnum.Files}
      />,
      { preloadedState: mockState }
    )

    const formattedDate = getFormattedDate({
      date: mockFiles[0].createdAt,
      options: { year: 'numeric', month: 'long' }
    })

    const date = screen.getByText(formattedDate)
    const file = screen.getByText('Cool book.pdf')

    expect(date).toBeInTheDocument()
    expect(file).toBeInTheDocument()
  })
})
