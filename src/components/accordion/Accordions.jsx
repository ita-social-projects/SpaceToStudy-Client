import { useTranslation } from 'react-i18next'

import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { styles } from '~/components/accordion/Accordion.styles'

const Accordions = ({
  items,
  onChange,
  activeIndex,
  icon,
  sx = styles,
  titleVariant,
  descriptionVariant,
  ...props
}) => {
  const { t } = useTranslation()

  const isMultiple = Array.isArray(activeIndex)

  const accordionStyle = sx[icon ? 'withIcon' : 'noIcon'] ?? {}

  const accordionList = items.map((item, index) => {
    const active = isMultiple
      ? activeIndex.includes(index)
      : activeIndex === index
    const activeAccordionStyle = {
      ...accordionStyle.accordion,
      ...(active ? accordionStyle.active : accordionStyle.inactive)
    }
    return (
      <Accordion
        data-testid={`${index}-${String(active)}`}
        disableGutters
        expanded={active}
        key={item.title}
        onChange={() => onChange(index)}
        square={props.square}
        sx={activeAccordionStyle}
        {...props}
      >
        <AccordionSummary expandIcon={icon} sx={accordionStyle.summary}>
          <Typography
            data-testid={`accordion-title-${index}`}
            sx={
              active ? accordionStyle.titleActive : accordionStyle.titleInactive
            }
            variant={titleVariant}
          >
            {t(item.title)}
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={accordionStyle.details}>
          <Typography
            data-testid={`accordion-description-${index}`}
            sx={accordionStyle.description}
            variant={descriptionVariant}
          >
            {t(item.description)}
          </Typography>
        </AccordionDetails>
      </Accordion>
    )
  })

  return <Box sx={accordionStyle.root}>{accordionList}</Box>
}

export default Accordions
