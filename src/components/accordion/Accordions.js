import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Box } from '@mui/system'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'

const Accordions = ({ items, onChange, activeIndex, showMoreIcon, style, square }) => {
  const { t } = useTranslation()

  return (
    <Box sx={ style.root }>
      { items.map((item, index) => (
        <Accordion
          data-testid={ `${ index }-${ activeIndex === index }` }
          disableGutters
          expanded={ activeIndex === index }
          key={ index }
          onChange={ () => onChange(index) }
          square
          sx={ [style.accordion, activeIndex === index ? style.active : style.inactive] }
        >
          <AccordionSummary
            expandIcon={ showMoreIcon && <ExpandMoreRoundedIcon /> }
            sx={ style.summary }
          >
            <Typography sx={ style.title } variant={ 'h6' }>
              { t(item.title) }
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={ style.details } >
            <Typography sx={ style.description } variant={ 'body1' }>
              { t(item.description) }
            </Typography>
          </AccordionDetails>
        </Accordion>
      )) }
    </Box>
  )
}

export default Accordions
