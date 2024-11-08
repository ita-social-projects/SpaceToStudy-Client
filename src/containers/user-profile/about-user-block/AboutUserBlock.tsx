import { FC } from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'

import useBreakpoints from '~/hooks/use-breakpoints'
import Accordions from '~/components/accordion/Accordions'
import useAccordions from '~/hooks/use-accordions'
import { ProfessionalBlock, TypographyVariantEnum } from '~/types'

import { styles } from '~/containers/user-profile/about-user-block/AboutUserBlock.styles'

interface AboutTutorBlockProps {
  data: ProfessionalBlock
  itemKeys: Array<keyof ProfessionalBlock>
  title: string
  userRole: string
}

const AboutUserBlock: FC<AboutTutorBlockProps> = ({ data, itemKeys, title, userRole }) => {
  const { isMobile } = useBreakpoints()

  const [expandedItem, handleAccordionChange] = useAccordions()

  // const professionalBlockKeys = Object.keys(data) as Array<
  //   keyof ProfessionalBlock
  // >

  const accordionItems = itemKeys
    .filter((key) => data[key])
    .map((key) => ({
      title: `userProfilePage.about${userRole}.${key}`,
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
        {title}
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

export default AboutUserBlock
