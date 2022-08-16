import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import BecomeATutor from '~/containers/mentor-home-page/become-a-tutor/BecomeATutor'

describe('BecomeATutor test', () => {
  beforeEach(() => {
    render(<BecomeATutor />)
  })

  it('should render first tab', () => {
    const firstTab = screen.getByText(/becomeTutor.generalInfo.title/i)

    expect(firstTab).toBeInTheDocument()
  })

  it('should render second tab', () => {
    const nextBtn = screen.getByText(/Next/i)
    fireEvent.click(nextBtn)

    const secondTab = screen.getByText(/2/i)

    expect(secondTab).toBeInTheDocument()
  })

  it('should open documents render error text after add wrong file type', async() => {
    const fakeFile = new File(['certificate'], 'test-file.png', { type: 'text/javascript' })

    const documents = screen.getByText(/Documents/i)
    fireEvent.click(documents)

    const input = screen.getByLabelText('becomeTutor.documents.button')
    fireEvent.change(input, { target: { files: [fakeFile] } })
    const error = screen.queryByText('becomeTutor.documents.typeError')

    await waitFor(() => expect(error).toBeInTheDocument())
  })

  it('should open documents render error after add wrong file size', async() => {
    const fakeFile = new File(['certificate'], 'test-file.png', { type: 'image/png' })
    Object.defineProperty(fakeFile, 'size', { value: 55_000_000 })

    const documents = screen.getByText(/Documents/i)
    fireEvent.click(documents)

    const input = screen.getByLabelText('becomeTutor.documents.button')
    fireEvent.change(input, { target: { files: [fakeFile] } })
    const error = screen.queryByText('becomeTutor.documents.allFilesSizeError')

    await waitFor(() => expect(error).toBeInTheDocument())
  })
})
