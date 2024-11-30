import { act } from '@testing-library/react'
import { vi } from 'vitest'
import { useDispatch } from 'react-redux'
import { StatusEnum } from '~/types'
import useConfirm from '~/hooks/use-confirm'
import useAxios from '~/hooks/use-axios'
import { setCooperationStatus } from '~/redux/features/cooperationsSlice'

vi.mock('~/hooks/use-confirm', () => ({
  default: vi.fn(() => ({
    checkConfirmation: vi.fn()
  }))
}))

vi.mock('~/hooks/use-axios', () => ({
  default: vi.fn(() => ({
    fetchData: vi.fn()
  }))
}))

vi.mock('react-redux', () => ({
  useDispatch: vi.fn()
}))

describe('handleCooperationStatusUpdate', () => {
  it('should call checkConfirmation and update status if confirmed', async () => {
    const checkConfirmation = vi.fn().mockResolvedValue(true)
    const fetchData = vi.fn()
    const dispatch = vi.fn()

    useConfirm.mockReturnValue({ checkConfirmation })
    useAxios.mockReturnValue({ fetchData })
    useDispatch.mockReturnValue(dispatch)

    const handleCooperationStatusUpdate = async () => {
      const confirmed = await checkConfirmation({
        title: 'Confirm Cooperation Closing',
        message: 'Are you sure you want to close this cooperation?',
        check: true
      })
      if (confirmed) {
        await fetchData({ status: StatusEnum.RequestToClose })
        dispatch(setCooperationStatus(StatusEnum.RequestToClose))
      }
    }

    await act(async () => {
      await handleCooperationStatusUpdate()
    })

    expect(checkConfirmation).toHaveBeenCalled()
    expect(fetchData).toHaveBeenCalledWith({
      status: StatusEnum.RequestToClose
    })
    expect(dispatch).toHaveBeenCalledWith(
      setCooperationStatus(StatusEnum.RequestToClose)
    )
  })
})
