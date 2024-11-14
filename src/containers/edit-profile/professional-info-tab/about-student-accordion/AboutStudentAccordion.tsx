import { FC } from 'react'
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
import { aboutStudentKeys } from '~/containers/user-profile/about-user-block/about-user-block.constants'

interface AboutStudentAccordionProps {
  data: AboutStudentData
  handleInputChange?: UseFormEventHandler<
    AboutStudentData,
    React.ChangeEvent<HTMLInputElement>
  >
}

const AboutStudentAccordion: FC<AboutStudentAccordionProps> = ({
  data,
  handleInputChange
}) => {
  const { t } = useTranslation()
  const [expandedItem, handleAccordionChange] = useAccordions({
    initialState: 0,
    toggle: true
  })

  const mockHandleInputChange = () => null

  const accordionItems: AccordionItem[] = aboutStudentKeys.map((item) => {
    return {
      title: `editProfilePage.profile.professionalTab.accordionStudent.${item}`,
      content: (
        <AppTextArea
          fullWidth
          label={t(
            'editProfilePage.profile.professionalTab.accordionStudent.textareaLabel'
          )}
          maxLength={1000}
          onChange={mockHandleInputChange}
          value={data.education}
        />
      )
    }
  })

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
