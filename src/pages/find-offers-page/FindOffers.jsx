import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import AppSwitcher from '~/components/app-content-switcher/AppContentSwitcher'

const FindOffers = () => {
  const { t } = useTranslation()

  const [active, setActive] = useState(false)

  const handleChange = () => {
    setActive(!active)
  }

  const switchOptions = {
    left: {
      text: t('findOffers.topMenu.tutorsOffers'),
      tooltip: t('findOffers.contentSwitcher.switcher-tutor')
    },
    right: {
      text: t('findOffers.topMenu.studentsRequests'),
      tooltip: t('findOffers.contentSwitcher.switcher-student')
    }
  }

  return (
    <>
      <div data-testid='find offers'>Find Offers Page</div>

      <AppSwitcher
        active={ active }
        handleChange={ handleChange }
        switchOptions={ switchOptions }
        typographyVariant={ 'h6' }
      />

    </>
  )
}

export default FindOffers
