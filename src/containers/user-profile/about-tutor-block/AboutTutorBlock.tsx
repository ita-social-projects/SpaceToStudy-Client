import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'

import useBreakpoints from '~/hooks/use-breakpoints'
import Accordions from '~/components/accordion/Accordions'
import useAccordions from '~/hooks/use-accordions'
import { ProfessionalBlock, TypographyVariantEnum } from '~/types'

import { styles } from '~/containers/user-profile/about-tutor-block/AboutTutorBlock.styles'

interface AboutTutorBlockProps {
  data: ProfessionalBlock
}

const AboutTutorBlock: FC<AboutTutorBlockProps> = ({ data }) => {
  const { t } = useTranslation()
  const { isMobile } = useBreakpoints()

  const [expandedItem, handleAccordionChange] = useAccordions()

  const professionalBlockKeys = Object.keys(data) as Array<
    keyof ProfessionalBlock
  >
  const accordionItems = professionalBlockKeys
    .filter((key) => data[key])
    .map((key) => ({
      title: `userProfilePage.aboutTutor.${key}`,
      description: data[key]
    }))

  if (accordionItems.length === 0) {
    return null
  }

  const titleVariant = isMobile
    ? TypographyVariantEnum.Button
    : TypographyVariantEnum.H5

  return (
    <Box sx={styles.root}>
      <Typography sx={styles.title} variant={titleVariant}>
        {t('userProfilePage.aboutTutor.title')}
      </Typography>
      <Box sx={styles.wrapper}>
        <Accordions
          activeIndex={expandedItem}
          descriptionVariant={TypographyVariantEnum.Body1}
          icon={<ExpandMoreRoundedIcon />}
          items={accordionItems}
          onChange={handleAccordionChange}
          sx={{
            withIcon: {
              accordion: styles.accordion
            }
          }}
        />
      </Box>
    </Box>
  )
}

export default AboutTutorBlock
