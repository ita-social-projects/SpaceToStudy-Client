import { screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import IconExtentionWithTitle from '~/components/icon-extention-with-title/IconExtentionWithTitle'

describe('IconExtentionWithTitle test', () => {
  beforeEach(() => {
    renderWithProviders(
      <IconExtentionWithTitle description='13' title='NameOfAttachment.doc' />
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
    const description = screen.getByText('13 B')

    expect(description).toBeInTheDocument()
  })
})
