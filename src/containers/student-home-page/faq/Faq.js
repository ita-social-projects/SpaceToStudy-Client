import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Typography } from '@mui/material'

import Accordions from '~/components/accordion/Accordions'


const Faq = ({ items, isFromGuest }) => {
  const { t } = useTranslation()
  const [activeItemId, setActiveItemId] = useState(0)

  return (
    <Box className='section' id='faq' sx={ { flexDirection: 'column' } }>
      <Box sx={ { pb: '50px' } }>
        <Typography sx={ { textAlign: 'center',color: 'textPrimary', pb: '10px' } } variant='h5'>
          { t('studentHomePage.faq.title') }
        </Typography>  
        <Typography sx={ { textAlign: 'center',color: 'primary.900' } } variant='subtitle1'>
          { t('studentHomePage.faq.subtitle') }
        </Typography>  
      </Box> 
      <Accordions
        activeIndex={ activeItemId }
        isFromGuest={ isFromGuest }
        items={ items }
        onChange={ (id) => setActiveItemId(id) }
        styles={ { margin: { xs: '0 16px', sm: '0 24px ' }, maxWidth: { xs: '500px', sm: '720px', md: '928px' }  } }
      />
    </Box>
  )
}

export default Faq
