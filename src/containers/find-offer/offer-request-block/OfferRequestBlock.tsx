import { useTranslation } from 'react-i18next'

import TitleBlock from '~/components/title-block/TitleBlock'
import icon from '~/assets/img/find-offer/subject_icon.png'

import Button from '~scss-components/button/Button'
import CreateOffer from '~/containers/offer-page/create-offer/CreateOffer'
import AppDrawer from '~/components/app-drawer/AppDrawer'
import useBreakpoints from '~/hooks/use-breakpoints'
import { useDrawer } from '~/hooks/use-drawer'
import { translationKey } from '~/containers/find-offer/constants'

const OfferRequestBlock = () => {
  const { t } = useTranslation()
  const { isMobile } = useBreakpoints()
  const { openDrawer, closeDrawer, isOpen } = useDrawer()

  const handleOpenDrawer = () => {
    openDrawer()
  }

  return (
    <TitleBlock img={icon} translationKey={translationKey}>
      <Button fullWidth={isMobile} onClick={handleOpenDrawer}>
        {t(`${translationKey}.button`)}
      </Button>
      <AppDrawer onClose={closeDrawer} open={isOpen}>
        <CreateOffer closeDrawer={closeDrawer} />
      </AppDrawer>
    </TitleBlock>
  )
}

export default OfferRequestBlock
