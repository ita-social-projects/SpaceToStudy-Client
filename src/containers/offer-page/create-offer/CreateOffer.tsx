import { FC, useCallback } from 'react'

import { OfferService } from '~/services/offer-service'
import CreateOrEditOffer from '~/containers/offer-page/create-or-edit-offer/CreateOrEditOffer'

import { findFullObjects } from '~/utils/helper-functions'
import { CreateOrUpdateOfferData } from '~/types'

interface CreateOfferProps {
  closeDrawer: () => void
}

const CreateOffer: FC<CreateOfferProps> = ({ closeDrawer }) => {
  const postOffer = useCallback(
    (data: CreateOrUpdateOfferData) =>
      OfferService.createOffer({ ...data, FAQ: findFullObjects(data.FAQ) }),
    []
  )

  return <CreateOrEditOffer closeDrawer={closeDrawer} service={postOffer} />
}

export default CreateOffer
