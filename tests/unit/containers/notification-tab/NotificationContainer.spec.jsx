import { render, screen, fireEvent } from '@testing-library/react'
import NotificationContainer from '~/containers/edit-profile/notification-tab/NotificationContainer'
import { titleWithSubtitle } from '~/containers/edit-profile/notification-tab/NotificationContainer.constans'

describe('NotificationContainer', () => {
  let switchElements

  beforeEach(() => {
    render(<NotificationContainer />)
    switchElements = screen.getAllByRole('checkbox')
  })

  it('renders the correct number of switch elements', () => {
    expect(switchElements).toHaveLength(titleWithSubtitle.length)
  })

  it('changes switch state when clicked', () => {
    const firstSwitch = switchElements[0]
    expect(firstSwitch.checked).equal(false)

    fireEvent.click(firstSwitch)
    expect(firstSwitch.checked).equal(true)
  })

  it('renders the correct text for each setting item', () => {
    titleWithSubtitle.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument()
    })
  })
})
