import { render, screen } from '@testing-library/react'

import OfferGeneralInfo from '~/containers/offer-details/offer-general-info/OfferGeneralInfo'

const offerMock = {
  _id: '6450b7402ef2f44eb4d2c191',
  price: 170,
  proficiencyLevel: ['Beginner', 'Intermediate'],
  languages: ['Ukrainian'],
  subject: { _id: '6422d995d898aa732d038e8f', name: 'Piano' }
}

describe('OfferGeneralInfo', () => {
  beforeEach(() => {
    render(<OfferGeneralInfo offer={offerMock} />)
  })

  it('should render OfferGeneralInfo title', () => {
    const title = screen.getByText('offerDetailsPage.generalInfo.title')

    expect(title).toBeInTheDocument()
  })

  it('should render subject', () => {
    const subject = screen.getByText('Piano')

    expect(subject).toBeInTheDocument()
  })
})
