import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import UserAvatar from '~scss-components/user-avatar/UserAvatar'

const firstName = 'John'
const lastName = 'Doe'
const avatarSrc = '/src/assets/img/user-profile-page/avatar.png'
const isOnline = true

describe('UserAvatar Component', () => {
  it('should render with monogram variant', () => {
    render(
      <UserAvatar
        firstName={firstName}
        isOnline={isOnline}
        lastName={lastName}
        variant='monogram'
      />
    )

    const monogramElement = screen.getByText(
      firstName.charAt(0) + lastName.charAt(0)
    )
    expect(monogramElement).toBeInTheDocument()
  })

  it('should show online status indicator when isOnline is true', () => {
    render(
      <UserAvatar
        firstName={firstName}
        isOnline
        lastName={lastName}
        src={avatarSrc}
        variant='photo'
      />
    )

    const onlineStatus = document.querySelector('.s2s-user-avatar-status')
    expect(onlineStatus).toBeInTheDocument()
  })

  it('should not show online status indicator when isOnline is false', () => {
    render(
      <UserAvatar
        firstName={firstName}
        isOnline={false}
        lastName={lastName}
        src={avatarSrc}
        variant='photo'
      />
    )

    const onlineStatus = document.querySelector('.s2s-user-avatar-status')
    expect(onlineStatus).not.toBeInTheDocument()
  })

  it('should trigger onClick callback when clicked', () => {
    const handleClick = vi.fn()

    render(
      <UserAvatar
        firstName={firstName}
        lastName={lastName}
        onClick={handleClick}
        variant='avatar'
      />
    )

    const avatarElement = document.querySelector('.s2s-avatar')
    avatarElement.click()

    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
