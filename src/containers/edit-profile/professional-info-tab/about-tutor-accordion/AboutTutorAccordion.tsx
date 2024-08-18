import { FC } from 'react'

import { useTranslation } from 'react-i18next'

import {
  AccordionItem,
  ProfessionalBlock,
  TypographyVariantEnum,
  UseFormEventHandler
} from '~/types'

import ExpandMore from '@mui/icons-material/ExpandMore'

import useAccordions from '~/hooks/use-accordions'
import Accordions from '~/components/accordion/Accordions'
import AppTextArea from '~/components/app-text-area/AppTextArea'

import { styles } from '~/containers/edit-profile/professional-info-tab/about-tutor-accordion/AboutTutorAccordion.styles'

interface AboutTutorAccordionProps {
  data: ProfessionalBlock
  handleInputChange: UseFormEventHandler<
    ProfessionalBlock,
    React.ChangeEvent<HTMLInputElement>
  >
}

const AboutTutorAccordion: FC<AboutTutorAccordionProps> = ({
  data,
  handleInputChange
}) => {
  const { t } = useTranslation()
  const [expandedItem, handleAccordionChange] = useAccordions({
    initialState: 0,
    toggle: true
  })

  const accordionItems: AccordionItem[] = [
    {
      title: 'editProfilePage.profile.professionalTab.accordion.education',
      content: (
        <AppTextArea
          fullWidth
          label={t(
            'editProfilePage.profile.professionalTab.accordion.textareaLabel'
          )}
          maxLength={1000}
          onChange={handleInputChange('education')}
          value={data.education}
        />
      )
    },
    {
      title: 'editProfilePage.profile.professionalTab.accordion.workExperience',
      content: (
        <AppTextArea
          fullWidth
          label={t(
            'editProfilePage.profile.professionalTab.accordion.textareaLabel'
          )}
          maxLength={1000}
          onChange={handleInputChange('workExperience')}
          value={data.workExperience}
        />
      )
    },
    {
      title:
        'editProfilePage.profile.professionalTab.accordion.scientificActivities',
      content: (
        <AppTextArea
          fullWidth
          label={t(
            'editProfilePage.profile.professionalTab.accordion.textareaLabel'
          )}
          maxLength={1000}
          onChange={handleInputChange('scientificActivities')}
          value={data.scientificActivities}
        />
      )
    },
    {
      title: 'editProfilePage.profile.professionalTab.accordion.awards',
      content: (
        <AppTextArea
          fullWidth
          label={t(
            'editProfilePage.profile.professionalTab.accordion.textareaLabel'
          )}
          maxLength={1000}
          onChange={handleInputChange('awards')}
          value={data.awards}
        />
      )
    }
  ]

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

export default AboutTutorAccordion
