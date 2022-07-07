import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Typography } from '@mui/material'

import { accordionItems } from '~/containers/student-home-page/faq/accordionItems'
import Accordions from '~/components/accordion/Accordions'

const style = {
  accordion: {
    margin: { xs: '0 16px', sm: '0 24px ' },
    maxWidth: { xs: '500px', sm: '720px', md: '928px' }
  },
  title: { textAlign: 'center', color: 'textPrimary', pb: '10px' },
  subtitle: { textAlign: 'center',color: 'primary.900' }
}

const Faq = () => {
  const { t } = useTranslation()
  const [activeItemId, setActiveItemId] = useState(null)

  const items = accordionItems
  const changeAccordion = (id) => activeItemId === id ? setActiveItemId(null) : setActiveItemId(id)

  return (
    <Box className='section' id='faq' sx={ { flexDirection: 'column' } }>
      <Box sx={ { pb: '50px' } }>
        <Typography sx={ style.title } variant='h5'>
          { t('studentHomePage.faq.title') }
        </Typography>  
        <Typography sx={ style.subtitle } variant='subtitle1'>
          { t('studentHomePage.faq.subtitle') }
        </Typography>  
      </Box>
      <Accordions
        activeIndex={ activeItemId }
        isFromGuest={ false }
        items={ items }
        onChange={ changeAccordion }
        styles={ style.accordion }
      />
    </Box>
  )
}

export default Faq
