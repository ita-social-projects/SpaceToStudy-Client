import {  render, screen } from '@testing-library/react'
import AddDocuments from '~/containers/mentor-home-page/add-documents/AddDocuments'

describe('AddDocuments test', () => {
  beforeEach(() => {
    render(<AddDocuments />)
  })

  it('should render imgage', () => {
    const image = screen.getByAltText('becomeTutor.documents.imageAlt')
    screen.debug()
    expect(image).toBeInTheDocument()
  })
  it('should render description', () => {
    const text = screen.getByText('becomeTutor.documents.description')
    screen.debug()
    expect(text).toBeInTheDocument()
  })
})
