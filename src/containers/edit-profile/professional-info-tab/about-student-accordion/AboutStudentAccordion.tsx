import { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import {
  AccordionItem,
  AboutStudentData,
  TypographyVariantEnum,
  UseFormEventHandler
} from '~/types'

import ExpandMore from '@mui/icons-material/ExpandMore'

import useAccordions from '~/hooks/use-accordions'
import Accordions from '~/components/accordion/Accordions'
import AppTextArea from '~/components/app-text-area/AppTextArea'

import { styles } from '~/containers/edit-profile/professional-info-tab/about-tutor-accordion/AboutTutorAccordion.styles'
import {
  aboutStudentKeys,
  mockHandleStudentInputChange
} from '~/containers/user-profile/about-user-block/about-user-block.constants'

interface AboutStudentAccordionProps {
  data: AboutStudentData
  handleInputChange?: UseFormEventHandler<
    AboutStudentData,
    React.ChangeEvent<HTMLInputElement>
  >
}

const AboutStudentAccordion: FC<AboutStudentAccordionProps> = ({ data }) => {
  const { t } = useTranslation()
  const [expandedItem, handleAccordionChange] = useAccordions({
    initialState: 0,
    toggle: true
  })

  const accordionItems: AccordionItem[] = useMemo(() => {
    return aboutStudentKeys.map((item) => ({
      title: `editProfilePage.profile.professionalTab.accordionStudent.${item}`,
      content: (
        <AppTextArea
          fullWidth
          label={t(
            'editProfilePage.profile.professionalTab.accordionStudent.textareaLabel'
          )}
          maxLength={1000}
          onChange={mockHandleStudentInputChange}
          value={data[item]}
        />
      )
    }))
  }, [t, data])

  return (
    <Accordions
      activeIndex={expandedItem}
      descriptionVariant={TypographyVariantEnum.Body2}
      icon={<ExpandMore />}
      items={accordionItems}
      onChange={handleAccordionChange}
      sx={styles.accordion}
      titleVariant={TypographyVariantEnum.Body2}
    />
  )
}

export default AboutStudentAccordion
