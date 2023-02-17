import { act, renderHook } from '@testing-library/react-hooks'
import useConfirm from '~/hooks/use-confirm'
import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom'
import { ConfirmationDialogProvider } from '~/context/confirm-context'
import { vi } from 'vitest'

const unblock = vi.fn()
const block = () => unblock
const navigator = { block }
let res

describe('Use confirm custom hook', () => {
  beforeEach(() => {
    const wrapper = ({ children }) => (
      <ConfirmationDialogProvider>
        <NavigationContext.Provider value={{ navigator }}>{children}</NavigationContext.Provider>
      </ConfirmationDialogProvider>
    )
    res = renderHook(() => useConfirm(), { wrapper })
  })

  it('should not open confirm dialog', async () => {
    act(() => {
      expect(
        res.result.current.checkConfirmation({
          message: 'message',
          title: 'title'
        })
      ).toBe(true)
    })
  })

  it('should open confirm dialog', async () => {
    act(() => {
      res.result.current.setNeedConfirmation(true)
    })

    act(() => {
      res.result.current
        .checkConfirmation({
          message: 'message',
          title: 'title'
        })
        .then(() => {
          expect(res.result.current.openDialog).toHaveBeenCalled()
        })
    })
  })
})
