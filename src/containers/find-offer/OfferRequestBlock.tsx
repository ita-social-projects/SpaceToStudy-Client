import { useTranslation } from 'react-i18next'

import TitleBlock from '~/components/title-block/TitleBlock'
import icon from '~/assets/img/find-offer/subject_icon.png'
import AppButton from '~/components/app-button/AppButton'
import CreateOffer from '~/containers/offer-page/create-offer/CreateOffer'
import useBreakpoints from '~/hooks/use-breakpoints'
import { useDrawerContext } from '~/context/drawer-context'

import { translationKey } from '~/containers/find-offer/constants'

const OfferRequestBlock = () => {
  const { t } = useTranslation()
  const { isMobile } = useBreakpoints()
  const { openDrawer } = useDrawerContext()

  const handleOpenCreateOffer = () => {
    openDrawer({
      component: <CreateOffer />
    })
  }

  return (
    <TitleBlock img={icon} translationKey={translationKey}>
      <AppButton
        fullWidth={isMobile}
        onClick={handleOpenCreateOffer}
        sx={{ py: '14px' }}
      >
        {t(`${translationKey}.button`)}
      </AppButton>
    </TitleBlock>
  )
}

export default OfferRequestBlock
