import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'
import Box from '@mui/material/Box'

import Accordions from '~/components/accordion/Accordions'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import { accordionItems } from '~/containers/student-home-page/faq/accordionItems'
import { studentRoutes } from '~/router/constants/studentRoutes'

import { styles } from '~/containers/student-home-page/faq/Faq.styles'

const Faq = () => {
  const { t } = useTranslation()
  const [activeItemId, setActiveItemId] = useState(null)

  const changeAccordion = (id) =>
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
        descriptionVariant={'body2'}
        icon={<ExpandMoreRoundedIcon />}
        items={accordionItems}
        onChange={changeAccordion}
        square
        titleVariant={'h6'}
      />
    </Box>
  )
}

export default Faq
