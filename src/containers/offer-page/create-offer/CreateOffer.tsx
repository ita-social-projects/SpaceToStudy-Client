import { FC, useCallback, Dispatch, SetStateAction } from 'react'

import { OfferService } from '~/services/offer-service'
import CreateOrEditOffer from '~/containers/offer-page/create-or-edit-offer/CreateOrEditOffer'

import { findFullObjects } from '~/utils/helper-functions'
import { CreateOrUpdateOfferData } from '~/types'

interface CreateOfferProps {
  closeDrawer: () => void
  updateOffer?: Dispatch<SetStateAction<boolean>>
}

const CreateOffer: FC<CreateOfferProps> = ({ closeDrawer, updateOffer }) => {
  const postOffer = useCallback(
    (data: CreateOrUpdateOfferData) =>
      OfferService.createOffer({ ...data, FAQ: findFullObjects(data.FAQ) }),
    []
  )
  console.log(7)

  return (
    <CreateOrEditOffer
      closeDrawer={closeDrawer}
      service={postOffer}
      updateOffer={updateOffer}
    />
  )
}

export default CreateOffer
