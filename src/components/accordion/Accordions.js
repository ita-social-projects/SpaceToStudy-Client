import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Box } from '@mui/system'
import { style } from './accordion.styles'

const Accordions = ({ items, onChange, activeIndex, styles }) => {
  const { t } = useTranslation()

  return (
    <Box sx={ { ...styles } }>
      { items.map((item, index) => (
        <Accordion
          disableGutters="true"
          expanded={ activeIndex === index }
          key={ index }
          onChange={ () => onChange(index) }
          sx={ [style.accordion, activeIndex === index ? style.active : style.inactive] }
        >
          <AccordionSummary>
            <Typography sx={ style.title } variant={ 'h6' }>
              { t(item.title) }
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
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
