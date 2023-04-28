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
      icon={<ArrowForwardIosSharpIcon sx={styles.icon} />}
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

// <Box sx={styles.accordion.container} key={`${item}_${index}`}>
//   <Accordion
//     expanded={activeQuestions.includes(index)}
//     disableGutters
//     onChange={() => onChange(index)}
//     elevation={0}
//     style={styles.accordion.root}
//   >
//     <AccordionSummary
//       sx={styles.accordion.summary}
//       data-testid={`accordion-summary-${index}`}
//       expandIcon={
//         showIcon && (
//           <ArrowForwardIosSharpIcon
//             sx={styles.icon}
//             data-testid='accordion-icon'
//           />
//         )
//       }
//     >
//       <Typography
//         sx={styles.accordion.title(activeQuestions.includes(index))}
//         variant={VariantEnum.H6}
//       >
//         {t(item.title)}
//       </Typography>
//     </AccordionSummary>
//     <AccordionDetails>
//       <Typography
//         sx={styles.accordion.caption(showIcon)}
//         data-testid={`accordion-description-${index}`}
//         variant={VariantEnum.Body2}
//       >
//         {t(item.description)}
//       </Typography>
//     </AccordionDetails>
//   </Accordion>
// </Box>
