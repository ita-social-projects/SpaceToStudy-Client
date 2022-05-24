import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Box } from '@mui/system'
import { style } from './accordionStyles'

const Accordions = ({ items, onChange ,activeIndex,styles }) => {

  const { t } = useTranslation()

  return (
    <Box sx={ { ...styles } }>
      { items.map((item,index) => 
        (
          <Accordion
            disableGutters='true'
            expanded={ activeIndex === index }
            key={ index }
            onChange={ ()=> onChange(index) }
            sx={ activeIndex === index ? style.active : style.accordion }
          >
            <AccordionSummary>
              <Typography sx={ style.heading } variant={ 'h6' }>
                { t(item.heading) }
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={ style.subHeading } variant={ 'body1' }>
                { t(item.subHeading) }
              </Typography>
            </AccordionDetails>
          </Accordion>
        )) }
    </Box>
  )
}

export default Accordions

