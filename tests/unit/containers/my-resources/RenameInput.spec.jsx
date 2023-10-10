import { fireEvent, screen } from '@testing-library/react'

import RenameInput from '~/containers/my-resources/rename-input/RenameInput'
import { renderWithProviders } from '~tests/test-utils'

const onCancel = vi.fn()
const onSave = vi.fn()

describe('RenameInput component test', () => {
  beforeEach(() => {
    renderWithProviders(
      <RenameInput initValue={''} onCancel={onCancel} onSave={onSave} />
    )
  })

  it('should render save and cancel buttons', () => {
    const clearBtn = screen.getByTestId('ClearIcon')
    const saveBtn = screen.getByTestId('DoneIcon')

    expect(clearBtn).toBeInTheDocument()
    expect(saveBtn).toBeInTheDocument()
  })

  it('should change input value', async () => {
    const input = screen.getByRole('textbox')
    const saveBtn = screen.getByTestId('DoneIcon')

    expect(input.value).toBe('')
    expect(saveBtn.parentElement).toHaveAttribute('disabled')

    fireEvent.click(input)
    fireEvent.change(input, { target: { value: 'new value' } })

    expect(input.value).toBe('new value')
    expect(saveBtn.parentElement).not.toHaveAttribute('disabled')
  })

  it('should click on clear button', async () => {
    const clearBtn = screen.getByTestId('ClearIcon')

    fireEvent.click(clearBtn)

    expect(onCancel).toHaveBeenCalled()
  })

  it('should click on save button', async () => {
    const saveBtn = screen.getByTestId('DoneIcon')
    const input = screen.getByRole('textbox')

    fireEvent.click(input)
    fireEvent.change(input, { target: { value: 'new value' } })
    fireEvent.click(saveBtn)

    expect(onSave).toHaveBeenCalled()
  })
})
