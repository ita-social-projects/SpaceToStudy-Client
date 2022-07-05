import { screen, fireEvent, render } from '@testing-library/react'
import FindMentorBlock from '~/containers/student-home/find-mentor-block/FindMentorBlock'
import useBreakpoints from '~/hooks/use-breakpoints'

const mockNavigate = jest.fn()

jest.mock('~/hooks/use-breakpoints')
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}))


describe('FindMentorBlock test', () => {
  beforeEach(() => {
    useBreakpoints.mockImplementation(() => 'desktop')
    render(<FindMentorBlock />)
  })
    
  it('should render image for desktop window size', async () => {
    const img = screen.getByAltText('Bag')

    expect(img).toBeInTheDocument()
  })
  it('should navigate if click on find mentor button', async () => {
    const findMentorButton = screen.getByText('studentHome.findMentorBlock.button')
    fireEvent.click(findMentorButton)

    expect(mockNavigate).toHaveBeenCalled()
  })
  it('should navigate if press enter', async () => {
    const input = screen.getByLabelText(/studentHome.findMentorBlock.label/i)
    fireEvent.change(input, { target: { value: 'test' } })
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 })

    expect(mockNavigate).toHaveBeenCalled()
  })
})
