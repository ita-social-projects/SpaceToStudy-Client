import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'

import { accordionItems } from '~/containers/student-home-page/faq/accordionItems'
import Accordions from '~/components/accordion/Accordions'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import { studentRoutes } from '~/constants/routes'

const Faq = () => {
  const { t } = useTranslation()
  const [activeItemId, setActiveItemId] = useState(null)

  const changeAccordion = (id) => (activeItemId === id ? setActiveItemId(null) : setActiveItemId(id))

  return (
    <Box className='section' id={ studentRoutes.navBar.faq.label } sx={ { flexDirection: 'column', mb: 0, pb: 10 } }>
      <TitleWithDescription
        description={ t('studentHomePage.faq.subtitle') }
        descriptionStyles={ { typography: { xs: 'subtitle1' } } }
        title={ t('studentHomePage.faq.title') }
        titleStyles={ { typography: { xs: 'h5' } } }
      />

      <Accordions
        activeIndex={ activeItemId } items={ accordionItems } onChange={ changeAccordion }
        showMoreIcon square
      />
    </Box>
  )
}

export default Faq
