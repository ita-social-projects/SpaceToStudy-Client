import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Box } from '@mui/system'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'

import { guestStyle, faqStyle } from './accordion.styles'

const Accordions = ({ items, isFromGuest = true, onChange, activeIndex, styles }) => {
  const { t } = useTranslation()

  let style
  isFromGuest ? style = guestStyle : style = faqStyle 
  console.log(style)
  return (
    <Box sx={ { ...styles } }>
      { items.map((item, index) => (
        <Accordion
          disableGuttersmaxWidth
          expanded={ activeIndex === index }
          key={ index }
          onChange={ () => onChange(index) }
          sx={ [style.accordion, activeIndex === index ? style.active : style.inactive] }
        >
          <AccordionSummary
            expandIcon={ !isFromGuest && <ExpandMoreRoundedIcon /> }
            sx={ style?.summary }
          >
            <Typography sx={ style.title } variant={ 'h6' }>
              { t(item.title) }
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={ style.details } >
            <Typography sx={ style?.description } variant={ 'body1' }>
              { t(item.description) }
            </Typography>
          </AccordionDetails>
        </Accordion>
      )) }
    </Box>
  )
}

export default Accordions
