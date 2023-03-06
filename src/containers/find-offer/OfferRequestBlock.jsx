import { useTranslation } from 'react-i18next'
import useBreakpoints from '~/hooks/use-breakpoints'

import TitleBlock from '~/components/title-block/TitleBlock'
import Button from '@mui/material/Button'
import icon from '~/assets/img/find-offer/subject_icon.png'

import { translationKey } from '~/containers/find-offer/constants'

const OfferRequestBlock = () => {
  const { t } = useTranslation()
  const { isMobile } = useBreakpoints()

  return (
    <TitleBlock img={ icon } translationKey={ translationKey } >
      <Button
        fullWidth={ isMobile } 
        size='extraLarge'
        variant='contained'
      >
        { t(`${translationKey}.button`) }
      </Button>
    </TitleBlock>
  )
}

export default OfferRequestBlock
