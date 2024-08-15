import { screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import AvatarIcon from '~/components/avatar-icon/AvatarIcon'

const mockFirstName = 'John'
const mockLastName = 'Doe'
const mockPhoto = 'path-to-photo'

describe('AvatarIcon Component', () => {
  it('should render with initials when photo is not provided', () => {
    renderWithProviders(
      <AvatarIcon firstName={mockFirstName} lastName={mockLastName} />
    )

    const avatarElement = screen.getByText('JD')
    expect(avatarElement).toBeInTheDocument()
  })

  it('should render with a photo when photo is provided', async () => {
    renderWithProviders(
      <AvatarIcon
        firstName={mockFirstName}
        lastName={mockLastName}
        photo={mockPhoto}
      />
    )

    const avatarElement = screen.getByAltText('User Avatar')
    expect(avatarElement).toBeInTheDocument()
    expect(avatarElement).toHaveAttribute('src', mockPhoto)
  })
})
