import { vi } from 'vitest'
import { screen, fireEvent } from '@testing-library/react'
import AddDocuments from '~/containers/add-documents/AddDocuments'
import { SnackBarProvider } from '~/context/snackbar-context'
import { renderWithProviders } from '~tests/test-utils'

const fetchData = vi.fn()
const formData = new FormData()

describe('AddDocuments test', () => {
  beforeEach(() => {
    renderWithProviders(
      <SnackBarProvider>
        <AddDocuments
          buttonText={'common.uploadNewFile'}
          fetchData={fetchData}
          formData={formData}
        />
      </SnackBarProvider>
    )
  })

  it('should render button', () => {
    const button = screen.getByLabelText('common.uploadNewFile')

    expect(button).toBeInTheDocument()
  })

  it('should render error text after add wrong file type', async () => {
    const fakeFile = new File(['certificate'], 'test-file.js', {
      type: 'text/javascript'
    })

    const button = screen.getByLabelText('common.uploadNewFile')
    fireEvent.change(button, { target: { files: [fakeFile] } })

    expect(screen.getByText('common.typeError')).toBeInTheDocument()
  })

  it('should render error after add wrong file size', async () => {
    const fakeFile = new File(['certificate'], 'test-file.png', {
      type: 'image/png'
    })
    Object.defineProperty(fakeFile, 'size', { value: 15_000_000 })

    const button = screen.getByLabelText('common.uploadNewFile')
    fireEvent.change(button, { target: { files: [fakeFile] } })

    expect(screen.getByText('common.fileSizeError')).toBeInTheDocument()
  })
})
