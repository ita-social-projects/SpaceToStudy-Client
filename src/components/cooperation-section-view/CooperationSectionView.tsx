import Box from '@mui/material/Box'

import { FC, useState, ReactNode, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import AppTextField from '~/components/app-text-field/AppTextField'
import HeaderTextWithDropdown from '~/components/header-text-with-dropdown/HeaderTextWithDropdown'
import ResourceItem from '~/containers/course-section/resource-item/ResourceItem'
import { Activities, CourseSection, TextFieldVariantEnum } from '~/types'

import { styles } from '~/components/cooperation-section-view/CooperationSectionView.styles'

interface CooperationSectionViewProps {
  id?: string
  item: CourseSection
}

const CooperationSectionView: FC<CooperationSectionViewProps> = ({
  item,
  id
}) => {
  const [isVisible, setIsVisible] = useState(true)
  const { t } = useTranslation()

  const resources = useMemo<undefined | ReactNode[]>(
    () =>
      item.activities?.map((activity: Activities) => (
        <ResourceItem
          isView
          key={activity.resource._id}
          resource={activity.resource}
          resourceType={activity.resourceType}
        />
      )),
    [item.activities]
  )

  return (
    <Box sx={styles.root}>
      <HeaderTextWithDropdown
        isView
        isVisible={isVisible}
        sectionData={item}
        setIsVisible={setIsVisible}
      />
      {isVisible && (
        <Box key={id} sx={styles.showBlock}>
          <AppTextField
            InputProps={styles.descriptionInput}
            fullWidth
            inputProps={styles.input}
            label={
              item.description
                ? ''
                : t('course.courseSection.defaultNewDescription')
            }
            value={item.description}
            variant={TextFieldVariantEnum.Standard}
            withHelperText
          />
          {resources}
        </Box>
      )}
    </Box>
  )
}

export default CooperationSectionView
