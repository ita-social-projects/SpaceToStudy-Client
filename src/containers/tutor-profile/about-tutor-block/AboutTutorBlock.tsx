import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'

import useBreakpoints from '~/hooks/use-breakpoints'
import Accordions from '~/components/accordion/Accordions'
import { ProfessionalBlock, TypographyVariantEnum } from '~/types'

import { styles } from '~/containers/tutor-profile/about-tutor-block/AboutTutorBlock.styles'

interface AboutTutorBlockProps {
  data: ProfessionalBlock
}

const AboutTutorBlock: FC<AboutTutorBlockProps> = ({ data }) => {
  const { t } = useTranslation()
  const { isMobile } = useBreakpoints()
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const handleAccordionChange = (index: number) => {
    setActiveIndex(activeIndex !== index ? index : null)
  }

  const accordionItems = Object.keys(data)
    .filter((el) => data[el as keyof ProfessionalBlock])
    .map((el) => ({
      title: `tutorProfilePage.aboutTutor.${el}`,
      description: data[el as keyof ProfessionalBlock]
    }))

  return (
    <Box sx={styles.root}>
      <Typography
        sx={styles.title}
        variant={
          isMobile ? TypographyVariantEnum.Button : TypographyVariantEnum.H5
        }
      >
        {t('tutorProfilePage.aboutTutor.title')}
      </Typography>
      <Box sx={styles.wrapper}>
        <Accordions
          activeIndex={activeIndex}
          descriptionVariant={TypographyVariantEnum.Body1}
          icon={<ExpandMoreRoundedIcon />}
          items={accordionItems}
          onChange={handleAccordionChange}
          sx={styles.accordion}
        />
      </Box>
    </Box>
  )
}

export default AboutTutorBlock
