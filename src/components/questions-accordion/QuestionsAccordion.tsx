import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'

import { AccordionItem, IconPositionEnum } from '~/types'
import Accordion from '@mui/material/Accordion'
import { AccordionDetails, AccordionSummary } from '@mui/material'
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'
import { styles } from './QuestionsAccordion.styles'

interface QuestionsAccordion {
  items: AccordionItem[]
}

const QuestionsAccordion: FC<QuestionsAccordion> = ({ items }) => {
  const [activeQuestion, setActiveQuestion] = useState(0)

  const { t } = useTranslation()

  const accordionStyle = {
    summary: {},
    title: {},
    details: {},
    description: {}
  }

  return (
    <Box>
      {/* change variant of typography */}
      <Typography sx={styles.title} variant='h5'>
        Frequently Asked questions
      </Typography>
      {items.map((item, index) => (
        <Box sx={styles.accordion.container}>
          <Accordion
            // expanded={Boolean(activeQuestion)}
            // disableGutters
            onChange={(e, w) => console.log(e, w)}
            key={index}
            square={true}
            elevation={0}
            sx={{}}
          >
            <AccordionSummary
              sx={styles.accordion.summary}
              expandIcon={
                // showMoreIcon && (
                <ArrowForwardIosSharpIcon
                  sx={{ color: 'primary.500', fontSize: '0.9rem' }}
                />
                // )
              }
              // sx={styles.accordion.title}
            >
              <Typography sx={styles.accordion.title} variant={'h6'}>
                {t(item.title)}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={accordionStyle.details}>
              <Typography sx={styles.accordion.caption} variant={'body2'}>
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
