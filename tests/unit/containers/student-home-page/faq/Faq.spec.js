import { render, screen, fireEvent } from '@testing-library/react'
import Faq from '~/containers/student-home-page/faq/Faq'


describe('Faq component test', () => {
  beforeEach(() => {
    render(<Faq />)
  })


  it('should render title', () => {
    const title = screen.getByText('studentHomePage.faq.title')
    
    expect(title).toBeInTheDocument()
  })
    
  it('should render expand moreMore icon', () => {
    const icon = screen.getAllByTestId('ExpandMoreRoundedIcon')
      
    expect(icon).toHaveLength(4)
  })
    
  it('should render findTurot text', () => {
    const text = screen.getByText('studentHomePage.faq.findTutor')

    expect(text).toBeInTheDocument()
  })

})
