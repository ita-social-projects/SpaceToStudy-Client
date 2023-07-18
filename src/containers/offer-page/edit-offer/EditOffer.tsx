import { FC, useCallback } from 'react'

import { OfferService } from '~/services/offer-service'
import CreateOrEditOffer from '~/containers/offer-page/create-or-edit-offer/CreateOrEditOffer'

import { findFullObjects } from '~/utils/helper-functions'
import { CreateOrUpdateOfferData, Offer } from '~/types'

interface EditOfferProps {
  offer: Offer | null
  closeDrawer: () => void
}

const EditOffer: FC<EditOfferProps> = ({ offer, closeDrawer }) => {
  const updateOffer = useCallback(
    (updateData: CreateOrUpdateOfferData) =>
      OfferService.updateOffer(offer?._id ?? '', {
        ...updateData,
        FAQ: findFullObjects(updateData.FAQ)
      }),
    [offer?._id]
  )

  return (
    <CreateOrEditOffer
      closeDrawer={closeDrawer}
      existingOffer={offer}
      service={updateOffer}
    />
  )
}

export default EditOffer
