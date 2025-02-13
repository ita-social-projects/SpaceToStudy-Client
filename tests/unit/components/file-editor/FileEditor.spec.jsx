import { queryByAttribute, render } from '@testing-library/react'
import FileEditor from '~/components/file-editor/FileEditor.tsx'

describe('Test file editor', () => {
  it('should render file editor', () => {
    const { container } = render(<FileEditor />)

    const editorElement = queryByAttribute('id', container, /tiny-react/)

    expect(editorElement).toBeInTheDocument()
  })
})
