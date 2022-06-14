import { act, renderHook } from '@testing-library/react-hooks'
import useConfirm from '~/hooks/use-confirm'
import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom'
import { ConfirmationDialogContext } from '~/context/confirm-context'

const unblock = jest.fn()
const openDialog = jest.fn()
const block = () => unblock
const navigator = { block }

describe('Use confirm custom hook', () => {
  it('should not block browser navigation', async () => {
    let needConfirmation = false
    const wrapper = ({ children }) => (
      <ConfirmationDialogContext.Provider value={ { openDialog, needConfirmation } }>
        <NavigationContext.Provider value={ { navigator } }>
          { children }
        </NavigationContext.Provider>
      </ConfirmationDialogContext.Provider>
    )
    renderHook(() => useConfirm(), { wrapper })
    expect(unblock).toHaveBeenCalled()
  })

  it('should show confirm dialog', async () => {
    let needConfirmation = true
    const wrapper = ({ children }) => (
      <ConfirmationDialogContext.Provider value={ { openDialog, needConfirmation } }>
        <NavigationContext.Provider value={ { navigator } }>
          { children }
        </NavigationContext.Provider>
      </ConfirmationDialogContext.Provider>
    )
    const { result } = renderHook(() => useConfirm(), { wrapper })

    act(() => {
      result.current.checkConfirmation({
        message: 'message',
        title: 'title'
      })
    })

    expect(openDialog).toHaveBeenCalled()
  })
})
