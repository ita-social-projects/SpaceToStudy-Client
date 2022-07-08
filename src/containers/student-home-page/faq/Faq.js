import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Typography } from '@mui/material'

import { accordionItems } from '~/containers/student-home-page/faq/accordionItems'
import Accordions from '~/components/accordion/Accordions'

import { style } from '~/containers/student-home-page/faq/faq.style'

const Faq = () => {
  const { t } = useTranslation()
  const [activeItemId, setActiveItemId] = useState(null)

  const items = accordionItems
  const changeAccordion = (id) => activeItemId === id ? setActiveItemId(null) : setActiveItemId(id)

  return (
    <Box className='section' id='faq' sx={ style.root }>
      <Box sx={ style.titleBox }>
        <Typography sx={ style.title } variant='h5'>
          { t('studentHomePage.faq.title') }
        </Typography>  
        <Typography sx={ style.subtitle } variant='subtitle1'>
          { t('studentHomePage.faq.subtitle') }
        </Typography>  
      </Box>
      <Accordions
        activeIndex={ activeItemId }
        items={ items }
        onChange={ changeAccordion }
        showMoreIcon
        style={ style.accordions }
      />
    </Box>
  )
}

export default Faq
