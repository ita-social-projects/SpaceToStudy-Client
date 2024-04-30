import Accordions from '~/components/accordion/Accordions'
import { ExpandMore } from '@mui/icons-material'
import AppTextArea from '~/components/app-text-area/AppTextArea'
import { useState } from 'react'
import useForm from '~/hooks/use-form'
import { useTranslation } from 'react-i18next'
import { styles } from './AboutTutorAccordion.styles'
import { initialFormValues } from './AboutTutorAccordion.constants'
import { AccordionItem } from '~/types'

const AboutTutorAccordion = () => {
  const { t } = useTranslation()
  const [activeItemId, setActiveItemId] = useState(0)

  const { data, handleInputChange } = useForm({
    initialValues: initialFormValues
  })

  // TODO: replace content if backend is done
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
      activeIndex={activeItemId}
      descriptionVariant='body2'
      icon={<ExpandMore />}
      items={accordionItems}
      onChange={(index) => setActiveItemId(index)}
      sx={styles.accordion}
      titleVariant='body2'
    />
  )
}

export default AboutTutorAccordion
