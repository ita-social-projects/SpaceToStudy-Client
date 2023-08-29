import { screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import IconExtensionWithTitle from '~/components/icon-extension-with-title/IconExtensionWithTitle'

describe('IconExtensionWithTitle test', () => {
  beforeEach(() => {
    renderWithProviders(
      <IconExtensionWithTitle size={21855} title='NameOfAttachment.doc' />
    )
  })

  it('Should render title', () => {
    const title = screen.getByText('NameOfAttachment.doc')

    expect(title).toBeInTheDocument()
  })

  it('Should render icon text', () => {
    const iconText = screen.getByText('doc')

    expect(iconText).toBeInTheDocument()
  })

  it('Should render description', () => {
    const description = screen.getByText('21.3 common.kilobytes')

    expect(description).toBeInTheDocument()
  })
})
