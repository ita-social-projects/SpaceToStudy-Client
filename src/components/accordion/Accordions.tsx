import { FC, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Accordion, { AccordionProps } from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'

import { styles } from '~/components/accordion/Accordion.styles'

import { AccordionItem, AccordionSx } from '~/types'
import { Variant } from '@mui/material/styles/createTypography'

interface AccordionsProps
  extends Omit<AccordionProps, 'onChange' | 'children' | 'sx'> {
  items: AccordionItem[]
  onChange: (value: number) => void
  activeIndex: number[] | number | null
  multiple?: boolean
  icon?: ReactNode
  sx?: AccordionSx
  titleVariant: Variant
  descriptionVariant: Variant
}

const Accordions: FC<AccordionsProps> = ({
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

  const accordionStyle = sx[icon ? 'withIcon' : 'noIcon']

  return (
    <Box sx={accordionStyle.root}>
      {items.map((item, index) => {
        const active = isMultiple
          ? activeIndex.includes(index)
          : activeIndex === index
        const activeAccordionStyle = {
          ...accordionStyle.accordion,
          ...(active ? accordionStyle.active : accordionStyle.inactive)
        }
        return (
          <Accordion
            data-testid={`${index}-${active}`}
            disableGutters
            expanded={active}
            key={index}
            onChange={() => onChange(index)}
            square={props.square}
            sx={activeAccordionStyle}
            {...props}
          >
            <AccordionSummary expandIcon={icon} sx={accordionStyle.summary}>
              <Typography
                data-testid={`accordion-title-${index}`}
                sx={
                  active
                    ? accordionStyle.titleActive
                    : accordionStyle.titleInactive
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
      })}
    </Box>
  )
}

export default Accordions
