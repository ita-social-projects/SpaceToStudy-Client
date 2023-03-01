import { useTranslation } from 'react-i18next'
import useBreakpoints from '~/hooks/use-breakpoints'

import UpperBlock from '~/components/upper-block/UpperBlock'
import Button from '@mui/material/Button'
import icon from '~/assets/img/find-offer/subject_icon.png'

const OfferRequestBlock = () => {
  const { t } = useTranslation()
  const { isMobile } = useBreakpoints()

  return (
    <UpperBlock img={ icon } path='findOffer.offerRequestBlock' >
      <Button
        fullWidth={ isMobile } 
        size='extraLarge'
        variant='contained'
      >
        { t('findOffer.offerRequestBlock.button') }
      </Button>
    </UpperBlock>
  )
}

export default OfferRequestBlock
