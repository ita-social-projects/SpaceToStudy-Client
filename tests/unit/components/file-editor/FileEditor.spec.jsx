import { render, screen, waitFor } from '@testing-library/react'
import FileEditor from '~/components/file-editor/FileEditor.tsx'

describe('Test file editor', () => {
  render(<FileEditor />)

  it('should render file editor', async () => {
    const editorElement = screen.queryAllByTestId('editor')

    waitFor(() => {
      expect(editorElement).toBeInTheDocument()
    })
  })
})
