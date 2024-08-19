import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '~/redux/store'
import NotificationTab from '~/containers/edit-profile/notification-tab/NotificationTab'
import { notificationGroupOptions } from '~/containers/edit-profile/notification-tab/NotificationTab.constants'

describe('NotificationTab', () => {
  let switchElements

  beforeEach(() => {
    render(
      <Provider store={store}>
        <NotificationTab />
      </Provider>
    )
    switchElements = screen.getAllByRole('checkbox')
  })

  it('renders the correct number of switch elements', () => {
    expect(switchElements).toHaveLength(notificationGroupOptions.length)
  })

  it('initial state of each switch is correct', () => {
    const initialStates = {
      notificationSettings: {
        isOfferStatusNotification: false,
        isChatNotification: false,
        isSimilarOffersNotification: false,
        isEmailNotification: false
      }
    }

    notificationGroupOptions.forEach((option, index) => {
      const field = option.field
      expect(switchElements[index].checked).toBe(
        initialStates.notificationSettings[field]
      )
    })
  })

  it('changes switch state when clicked', () => {
    switchElements.forEach((switchElement) => {
      expect(switchElement.checked).toBe(false)
      fireEvent.click(switchElement)
      expect(switchElement.checked).toBe(true)
    })
  })

  it('renders the correct text for each setting item', () => {
    notificationGroupOptions.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument()
      expect(screen.getByText(item.subtitle)).toBeInTheDocument()
    })
  })

  it('updates Redux store when switch state changes', () => {
    const firstSwitch = switchElements[0]
    expect(firstSwitch.checked).toBe(true)
    fireEvent.click(firstSwitch)
    const state = store.getState().editProfile
    expect(state.notificationSettings.isOfferStatusNotification).toBe(false)
  })
})
