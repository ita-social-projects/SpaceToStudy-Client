import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'

import { AccordionItem, VariantEnum } from '~/types'
import { styles } from '~/components/questions-accordion/QuestionsAccordion.styles'
import Accordions from '../accordion/Accordions'

interface QuestionsAccordion {
  items: AccordionItem[]
  title?: string
}

const QuestionsAccordion: FC<QuestionsAccordion> = ({ items, title = '' }) => {
  const { t } = useTranslation()

  const [activeQuestions, setActiveQuestions] = useState<number[]>([])

  const onChange = (activeQuestion: number) => {
    setActiveQuestions((prevActiveQuestions) => {
      if (prevActiveQuestions.includes(activeQuestion)) {
        return prevActiveQuestions.filter(
          (prevActiveQuestion) => prevActiveQuestion !== activeQuestion
        )
      } else {
        return [...prevActiveQuestions, activeQuestion]
      }
    })
  }

  const accordionTitle = title && (
    <Typography sx={styles.title} variant={VariantEnum.H5}>
      {t(title)}
    </Typography>
  )

  const accordionList = (
    <Accordions
      items={items}
      onChange={onChange}
      activeIndex={activeQuestions}
      icon={
        <ArrowForwardIosSharpIcon
          sx={styles.icon}
          data-testid='accordion-icon'
        />
      }
      multiple={true}
      sx={styles}
      titleVariant={VariantEnum.H6}
      descriptionVariant={VariantEnum.Body2}
      elevation={0}
    />
  )

  return (
    <Box sx={title ? styles.container : {}}>
      {accordionTitle}
      {accordionList}
    </Box>
  )
}

export default QuestionsAccordion
