import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import DownloadButton from '~/components/download-button/DownloadButton'
import { ResourcesTypesEnum as ResourceType } from '~/types'
import DownloadIcon from '~/assets/img/download-attachments/download-symbol.svg'
import Downloading from '~/assets/img/download-attachments/downloading.svg'

vi.mock('~/utils/download-file', () => ({
  downloadFile: vi.fn()
}))

vi.mock('~/services/resource-service', () => ({
  ResourceService: {
    downloadAttachment: vi.fn()
  }
}))

const mockAttachment = {
  _id: '123',
  resourceType: ResourceType.Attachment,
  fileName: 'test.pdf'
}

describe('DownloadButton', () => {
  beforeEach(() => {
    render(<DownloadButton resource={mockAttachment} />)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders the button and icon', () => {
    const button = screen.getByRole('button')
    const icon = screen.getByAltText('Download icon')

    expect(button).toBeInTheDocument()
    expect(icon.src).toContain(DownloadIcon)
  })

  it('calls downloadFile and shows loading state', async () => {
    const button = screen.getByRole('button')
    fireEvent.click(button)
    const icon = screen.getByAltText('Download icon').src

    expect(icon).toContain(Downloading)
  })
})
