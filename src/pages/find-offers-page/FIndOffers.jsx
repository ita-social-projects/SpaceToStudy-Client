import { useState } from 'react'
import { styles } from '~/containers/guest-home-page/how-it-works/HowItWorks.styles'
import { useTranslation } from 'react-i18next'
import AppSwitcher from '~/components/app-switcher/AppContentSwitcher'

const FIndOffers = () => {
  const { t } = useTranslation()

  const [isStudent, setIsStudent] = useState(false)

  const handleChange = () => {
    setIsStudent(!isStudent)
  }

  return ( 
    <>
      <div data-testid='find offers'>Find Offers Page</div>

      <AppSwitcher 
        colorActive={ 'primary.500' }
        colorInActive={ 'primary.900' }
        handleChange={ handleChange }
        isStudent={ isStudent }
        leftText={ t('findOffers.topMenu.tutorsOffers') }
        rightText={ t('findOffers.topMenu.studentsRequests') }
        spacing={ 0 }
        styles={ styles }
        tooltipLeft={ t('findOffersTooltips.switcher-tutor') }
        tooltipRight={ t('findOffersTooltips.switcher-student') }
        typographyVariant={ 'h6' }
      />

    </>
  )
}

export default FIndOffers
