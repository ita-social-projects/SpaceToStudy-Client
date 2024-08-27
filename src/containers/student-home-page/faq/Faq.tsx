import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'

import { accordionItems } from '~/containers/student-home-page/faq/accordionItems'
import Accordions from '~/components/accordion/Accordions'
import useAccordions from '~/hooks/use-accordions'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import { TypographyVariantEnum } from '~/types'

import { styles } from '~/containers/student-home-page/faq/Faq.styles'

const Faq = () => {
  const { t } = useTranslation()

  const [expandedItem, handleAccordionChange] = useAccordions()

  return (
    <Box className='section' sx={styles.container}>
      <TitleWithDescription
        description={t('studentHomePage.faq.subtitle')}
        style={styles.titleWithDescription}
        title={t('studentHomePage.faq.title')}
      />

      <Accordions
        activeIndex={expandedItem}
        descriptionVariant={TypographyVariantEnum.Body2}
        icon={<ExpandMoreRoundedIcon />}
        items={accordionItems}
        onChange={handleAccordionChange}
        square
        titleVariant={TypographyVariantEnum.H6}
      />
    </Box>
  )
}

export default Faq
