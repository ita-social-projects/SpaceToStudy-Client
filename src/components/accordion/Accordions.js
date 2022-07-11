import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Box } from '@mui/system'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'

import { style } from '~/components/accordion/accordions.style'

const Accordions = ({ items, onChange, activeIndex, showMoreIcon, square }) => {
  const { t } = useTranslation()

  const accordionType = showMoreIcon ? 'withShowMoreIcon' : 'noShowMoreIcon'

  return (
    <Box sx={ style[accordionType].root }>
      { items.map((item, index) => (
        <Accordion
          data-testid={ `${ index }-${ activeIndex === index }` }
          disableGutters
          expanded={ activeIndex === index }
          key={ index }
          onChange={ () => onChange(index) }
          square={ square }
          sx={ [style[accordionType].accordion, activeIndex === index ? style[accordionType].active : style[accordionType].inactive] }
        >
          <AccordionSummary
            expandIcon={ showMoreIcon && <ExpandMoreRoundedIcon /> }
            sx={ style[accordionType].summary }
          >
            <Typography sx={ style[accordionType].title } variant={ 'h6' }>
              { t(item.title) }
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={ style[accordionType].details } >
            <Typography sx={ style[accordionType].description } variant={ 'body1' }>
              { t(item.description) }
            </Typography>
          </AccordionDetails>
        </Accordion>
      )) }
    </Box>
  )
}

export default Accordions
