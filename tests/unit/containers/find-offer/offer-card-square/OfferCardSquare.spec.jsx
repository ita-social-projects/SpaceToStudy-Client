import { vi } from 'vitest'

import { screen, fireEvent } from '@testing-library/react'
import { beforeEach, expect } from 'vitest'
import OfferCardSquare from '~/containers/find-offer/offer-card-square/OfferCardSquare'
import { renderWithProviders } from '~tests/test-utils'
import { mockOffer } from '~tests/unit/pages/offer-details/OfferDetails.spec.constants'

const onBookmarkClick = vi.fn()
const buttonActions = [
  { label: 'Action 1', handleClick: vi.fn() },
  { label: 'Action 2', handleClick: vi.fn() }
]

describe('OfferCardSquare test', () => {
  beforeEach(() => {
    renderWithProviders(
      <OfferCardSquare
        buttonActions={buttonActions}
        offer={mockOffer}
        onBookmarkClick={onBookmarkClick}
      />
    )
  })

  it('Should render first name correctly', () => {
    const fullName = screen.getByText(
      `${mockOffer.author.firstName} ${mockOffer.author.lastName}`
    )

    expect(fullName).toBeInTheDocument()
  })

  it('Should render languages correctly', () => {
    const language = screen.getByText(`${mockOffer.languages.join(', ')}`)

    expect(language).toBeInTheDocument()
  })

  it('Should correctly display price', () => {
    const price = screen.getByText(`${mockOffer.price} common.uah`)

    expect(price).toBeInTheDocument()
  })

  it('should render initials on avatar if no photo is provided', () => {
    const avatarElement = screen.getByText(
      `${mockOffer.author.firstName[0]}${mockOffer.author.lastName[0]}`
    )

    expect(avatarElement).toBeInTheDocument()
  })

  it('renders the proficiency level', () => {
    const proficiencyLevel = screen.getByText(
      `${mockOffer.proficiencyLevel[0]} - ${
        mockOffer.proficiencyLevel[mockOffer.proficiencyLevel.length - 1]
      }`
    )

    expect(proficiencyLevel).toBeInTheDocument()
  })

  it('renders the send message button', () => {
    const sendMessageButton = screen.getByRole('button', {
      name: 'Action 1'
    })

    expect(sendMessageButton).toBeInTheDocument()
  })

  it('renders the view details button', () => {
    const viewDetailsButton = screen.getByRole('button', {
      name: 'Action 2'
    })
    expect(viewDetailsButton).toBeInTheDocument()
  })

  it('renders the bookmark button', () => {
    const bookmarkButton = screen.getByTestId('bookmark-icon')

    fireEvent.click(bookmarkButton)

    expect(onBookmarkClick).toHaveBeenCalledWith(mockOffer._id)
  })
})
