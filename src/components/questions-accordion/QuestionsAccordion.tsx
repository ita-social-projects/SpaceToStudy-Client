import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'

import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'

import { AccordionItem } from '~/types'
import { styles } from '~/components/questions-accordion/QuestionsAccordion.styles'

interface QuestionsAccordion {
  items: AccordionItem[]
  title?: string
  showIcon?: boolean
}

const QuestionsAccordion: FC<QuestionsAccordion> = ({
  items,
  title = '',
  showIcon = true
}) => {
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

  const { t } = useTranslation()

  return (
    <Box sx={title ? styles.container : {}}>
      {title ? (
        <Typography sx={styles.title} variant='h5'>
          {t(title)}
        </Typography>
      ) : null}
      {items.map((item, index) => (
        <Box sx={styles.accordion.container} key={`${item}_${index}`}>
          <Accordion
            expanded={activeQuestions.includes(index)}
            disableGutters
            onChange={() => onChange(index)}
            elevation={0}
            style={styles.accordion.root}
          >
            <AccordionSummary
              sx={styles.accordion.summary}
              data-testid={`accordion-summary-${index}`}
              expandIcon={
                showIcon ? (
                  <ArrowForwardIosSharpIcon
                    sx={styles.icon}
                    data-testid='accordion-icon'
                  />
                ) : null
              }
            >
              <Typography sx={styles.accordion.title} variant={'h6'}>
                {t(item.title)}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                sx={styles.accordion.caption(showIcon)}
                data-testid={`accordion-description-${index}`}
                variant={'body2'}
              >
                {t(item.description)}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
      ))}
    </Box>
  )
}

export default QuestionsAccordion
