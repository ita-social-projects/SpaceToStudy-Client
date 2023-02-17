import { useTranslation } from 'react-i18next'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'

import { styles } from '~/components/accordion/Accordion.styles.js'

const Accordions = ({ items, onChange, activeIndex, showMoreIcon, square }) => {
  const { t } = useTranslation()

  const accordionStyle = styles[showMoreIcon ? 'withShowMoreIcon' : 'noShowMoreIcon']

  return (
    <Box sx={ accordionStyle.root }>
      { items.map((item, index) => (
        <Accordion
          data-testid={ `${index}-${activeIndex === index}` }
          disableGutters
          expanded={ activeIndex === index }
          key={ index }
          onChange={ () => onChange(index) }
          square={ square }
          sx={ [accordionStyle.accordion, activeIndex === index ? accordionStyle.active : accordionStyle.inactive] }
        >
          <AccordionSummary expandIcon={ showMoreIcon && <ExpandMoreRoundedIcon /> } sx={ accordionStyle.summary }>
            <Typography sx={ accordionStyle.title } variant={ 'h6' }>
              { t(item.title) }
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={ accordionStyle.details }>
            <Typography sx={ accordionStyle.description } variant={ 'body1' }>
              { t(item.description) }
            </Typography>
          </AccordionDetails>
        </Accordion>
      )) }
    </Box>
  )
}

export default Accordions
