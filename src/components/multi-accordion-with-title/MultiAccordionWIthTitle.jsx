import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import Accordions from '~/components/accordion/Accordions'
import { TypographyVariantEnum } from '~/types'

const MultiAccordionWithTitle = ({
  items,
  title = '',
  sx = {},
  icon = <ArrowForwardIosSharpIcon data-testid='accordion-icon' sx={sx.icon} />
}) => {
  const { t } = useTranslation()

  const [activeItems, setActiveItems] = useState([])

  const onChange = (activeItem) => {
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
    <Typography sx={sx.title}>{t(title)}</Typography>
  )

  const accordionList = (
    <Accordions
      activeIndex={activeItems}
      descriptionVariant={TypographyVariantEnum.Body2}
      elevation={0}
      icon={icon}
      items={items}
      multiple
      onChange={onChange}
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
