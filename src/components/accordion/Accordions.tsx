import { FC, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Accordion, { AccordionProps } from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'

import { styles } from '~/components/accordion/Accordion.styles'

import { AccordionItem } from '~/types'
import { Variant } from '@mui/material/styles/createTypography'

interface AccordionsProps
  extends Omit<AccordionProps, 'onChange' | 'children'> {
  items: AccordionItem[]
  onChange: (value: number) => void
  activeIndex: number[] | number
  multiple?: boolean
  icon?: ReactNode
  sx?: { [key: string]: any }
  titleVariant: Variant
  descriptionVariant: Variant
}

const Accordions: FC<AccordionsProps> = ({
  items,
  onChange,
  activeIndex,
  multiple = false,
  icon,
  sx = styles,
  titleVariant,
  descriptionVariant,
  ...props
}) => {
  const { t } = useTranslation()

  const isMultiple = multiple && activeIndex instanceof Array

  const accordionStyle = sx[icon ? 'withShowMoreIcon' : 'noShowMoreIcon']

  return (
    <Box sx={accordionStyle.root}>
      {items.map((item, index) => (
        <Accordion
          data-testid={`${index}-${activeIndex === index}`}
          disableGutters
          expanded={
            isMultiple ? activeIndex.includes(index) : activeIndex === index
          }
          key={index}
          onChange={() => onChange(index)}
          square={props.square}
          sx={[
            accordionStyle.accordion,
            activeIndex === index || (isMultiple && activeIndex.includes(index))
              ? accordionStyle.active
              : accordionStyle.inactive
          ]}
          {...props}
        >
          <AccordionSummary expandIcon={icon} sx={accordionStyle.summary}>
            <Typography
              sx={
                isMultiple && accordionStyle.title instanceof Function
                  ? accordionStyle.title(activeIndex.includes(index))
                  : accordionStyle.title
              }
              variant={titleVariant}
            >
              {t(item.title)}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={accordionStyle.details}>
            <Typography
              sx={accordionStyle.description}
              variant={descriptionVariant}
            >
              {t(item.description)}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  )
}

export default Accordions
