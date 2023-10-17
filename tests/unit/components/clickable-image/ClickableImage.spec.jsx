import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import ClickableImage from '~/components/clickable-image/ClickableImage'

import someAvatar from '~/assets/img/tutor-profile-page/avatar.png'
import { ButtonVariantEnum } from '~/types'

describe('ClickableImage', () => {
  const image = someAvatar
  const buttonText = 'Click Me'

  const paragraphText = 'This is a custom paragraph'

  const customFunc = (image) => {
    const element = document.createElement('p')
    element.textContent = paragraphText
    document.body.appendChild(element)
    return image
  }

  it('renders the image and button', () => {
    const { getByRole, getByText } = render(
      <ClickableImage image={image}>{buttonText}</ClickableImage>
    )

    const imgElement = getByRole('img')
    const buttonElement = getByText(buttonText, { name: buttonText })

    expect(imgElement).toBeInTheDocument()
    expect(buttonElement).toBeInTheDocument()

    expect(buttonElement).toHaveClass(`MuiButton-${ButtonVariantEnum.Text}`)
  })

  it('calls the clickFunction when the button is clicked', () => {
    const { getByRole, getByText } = render(
      <ClickableImage image={image} onClick={customFunc}>
        {buttonText}
      </ClickableImage>
    )

    const buttonElement = getByText(buttonText)

    fireEvent.click(buttonElement)

    const paragraphElement = getByText(paragraphText)
    const imgElement = getByRole('img')

    expect(paragraphElement).toBeInTheDocument()
    expect(imgElement).toBeInTheDocument()
  })
})
