import { FC, useMemo } from 'react'
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
import { aboutTutorKeys } from '~/containers/user-profile/about-user-block/about-user-block.constants'

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

  const accordionItems: AccordionItem[] = useMemo(() => {
    return aboutTutorKeys.map((item) => {
      return {
        title: `editProfilePage.profile.professionalTab.accordionTutor.${item}`,
        content: (
          <AppTextArea
            fullWidth
            label={t(
              'editProfilePage.profile.professionalTab.accordionTutor.textareaLabel'
            )}
            maxLength={1000}
            onChange={handleInputChange(item)}
            value={data[item]}
          />
        )
      }
    })
  }, [t, handleInputChange, data])

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
