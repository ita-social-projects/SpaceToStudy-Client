import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'

import { accordionItems } from '~/containers/student-home-page/faq/accordionItems'
import Accordions from '~/components/accordion/Accordions'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import { studentRoutes } from '~/router/constants/studentRoutes'
import { VariantEnum } from '~/types'

import { styles } from '~/containers/student-home-page/faq/Faq.styles.js'

const Faq = () => {
  const { t } = useTranslation()
  const [activeItemId, setActiveItemId] = useState<number | null>(null)

  const changeAccordion = (id: number) =>
    activeItemId === id ? setActiveItemId(null) : setActiveItemId(id)

  return (
    <Box
      className='section'
      id={studentRoutes.navBar.faq.route}
      sx={styles.container}
    >
      <TitleWithDescription
        description={t('studentHomePage.faq.subtitle')}
        style={styles.titleWithDescription}
        title={t('studentHomePage.faq.title')}
      />

      <Accordions
        activeIndex={activeItemId}
        items={accordionItems}
        onChange={changeAccordion}
        icon={<ExpandMoreRoundedIcon />}
        square
        titleVariant={VariantEnum.H6}
        descriptionVariant={VariantEnum.Body2}
      />
    </Box>
  )
}

export default Faq
