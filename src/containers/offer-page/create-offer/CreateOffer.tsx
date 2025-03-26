import { FC, useCallback, Dispatch, SetStateAction } from 'react'

import { OfferService } from '~/services/offer-service'
import CreateOrEditOffer from '~/containers/offer-page/create-or-edit-offer/CreateOrEditOffer'

import { findFullObjects } from '~/utils/helper-functions'
import { CreateOrUpdateOfferData, Offer } from '~/types'
import { MutationFunction } from '@tanstack/react-query'

interface CreateOfferProps {
  closeDrawer: () => void
  updateOffer?: Dispatch<SetStateAction<boolean>>
}

const CreateOffer: FC<CreateOfferProps> = ({ closeDrawer, updateOffer }) => {
  const postOffer: MutationFunction<Offer | null, CreateOrUpdateOfferData> =
    useCallback(
      (data) =>
        OfferService.createOffer({ ...data, FAQ: findFullObjects(data.FAQ) }),
      []
    )

  return (
    <CreateOrEditOffer
      closeDrawer={closeDrawer}
      service={postOffer}
      updateOffer={updateOffer}
    />
  )
}

export default CreateOffer
