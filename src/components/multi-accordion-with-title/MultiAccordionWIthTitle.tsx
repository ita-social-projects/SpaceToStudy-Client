import { FC, ReactNode, useState } from 'react'
import { useTranslation } from 'react-i18next'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'

import { AccordionItem, MultiAccordionWithTitleSx, VariantEnum } from '~/types'
import { styles } from '~/components/multi-accordion-with-title/MultiAccordionWithTitle.styles'
import Accordions from '~/components/accordion/Accordions'
import useBreakpoints from '~/hooks/use-breakpoints'

interface MultiAccordionWithTitleProps {
  items: AccordionItem[]
  title?: string
  icon?: ReactNode
  sx?: MultiAccordionWithTitleSx
}

const MultiAccordionWithTitle: FC<MultiAccordionWithTitleProps> = ({
  items,
  title = '',
  sx = styles,
  icon = <ArrowForwardIosSharpIcon sx={sx.icon} data-testid='accordion-icon' />
}) => {
  const { t } = useTranslation()

  const { isMobile } = useBreakpoints()

  const [activeItems, setActiveItems] = useState<number[]>([])

  const onChange = (activeItem: number) => {
    setActiveItems((prevActiveItems) => {
      if (prevActiveItems.includes(activeItem)) {
        return prevActiveItems.filter(
          (prevActiveItem) => prevActiveItem !== activeItem
        )
      } else {
        return [...prevActiveItems, activeItem]
      }
    })
  }

  const accordionTitle = title && (
    <Typography
      sx={sx.title}
      variant={isMobile ? VariantEnum.H6 : VariantEnum.H5}
    >
      {t(title)}
    </Typography>
  )

  const accordionList = (
    <Accordions
      items={items}
      onChange={onChange}
      activeIndex={activeItems}
      icon={icon}
      multiple={true}
      sx={{
        withIcon:sx.withIcon,
        noIcon: sx.noIcon
      }}
      titleVariant={isMobile ? VariantEnum.Subtitle2 : VariantEnum.H6}
      descriptionVariant={VariantEnum.Body2}
      elevation={0}
    />
  )
  const containerStyle = title ? sx.container : {}

  return (
    <Box sx={containerStyle}>
      {accordionTitle}
      {accordionList}
    </Box>
  )
}

export default MultiAccordionWithTitle
