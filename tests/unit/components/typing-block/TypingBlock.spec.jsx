import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import TypingBlock from '~/components/typing-block/TypingBlock'
import AvatarIcon from '~/components/avatar-icon/AvatarIcon'

vi.mock('lottie-react', () => ({
  default: vi.fn(() => <div data-testid='lottie-animation' />)
}))

vi.mock('~/components/avatar-icon/AvatarIcon', () => ({
  default: vi.fn(() => <div data-testid='avatar-icon' />)
}))

describe('TypingBlock', () => {
  const userToSpeak = {
    user: {
      firstName: 'John',
      lastName: 'Doe',
      photo: 'photo.jpg'
    }
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders AvatarIcon with correct props', () => {
    render(<TypingBlock userToSpeak={userToSpeak} />)

    const avatarIcon = screen.getByTestId('avatar-icon')

    expect(avatarIcon).toBeInTheDocument()
    expect(AvatarIcon).toHaveBeenCalledWith(
      {
        firstName: 'John',
        lastName: 'Doe',
        photo: expect.any(String),
        sx: expect.any(Object)
      },
      {}
    )
  })

  it('renders Lottie animation', () => {
    render(<TypingBlock userToSpeak={userToSpeak} />)

    const lottieAnimation = screen.getByTestId('lottie-animation')

    expect(lottieAnimation).toBeInTheDocument()
  })
})
