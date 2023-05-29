import { render, screen } from '@testing-library/react'
import CooperationToolbar from '~/containers/my-cooperations/cooperation-toolbar/CooperationToolbar'

describe('CooperationContainer component ', () => {
  it('should render card in container', () => {
    render(<CooperationToolbar />)

    const input = screen.getByRole('textbox')

    expect(input).toBeInTheDocument()
  })
})
