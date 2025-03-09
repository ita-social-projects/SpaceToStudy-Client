import { FC, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'

import {
  AccordionItem,
  MultiAccordionWithTitleSx,
  TypographyVariantEnum
} from '~/types'
import Accordions from '~/components/accordion/Accordions'
import useAccordions from '~/hooks/use-accordions'

interface MultiAccordionWithTitleProps {
  items: AccordionItem[]
  title?: string
  icon?: ReactNode
  sx?: MultiAccordionWithTitleSx
}

const MultiAccordionWithTitle: FC<MultiAccordionWithTitleProps> = ({
  items,
  title = '',
  sx = {},
  icon = <ArrowForwardIosSharpIcon data-testid='accordion-icon' sx={sx.icon} />
}) => {
  const { t } = useTranslation()

  const [expandedItems, handleAccordionChange] = useAccordions({
    multiple: true
  })

  const accordionTitle = title && (
    <Typography sx={sx.title}>{t(title)}</Typography>
  )

  const accordionList = (
    <Accordions
      activeIndex={expandedItems}
      descriptionVariant={TypographyVariantEnum.Body2}
      elevation={0}
      icon={icon}
      items={items}
      multiple
      onChange={handleAccordionChange}
      sx={{
        withIcon: sx.withIcon,
        noIcon: sx.noIcon
      }}
    />
  )

  return (
    <Box sx={sx.root}>
      {accordionTitle}
      {accordionList}
    </Box>
  )
}

export default MultiAccordionWithTitle
