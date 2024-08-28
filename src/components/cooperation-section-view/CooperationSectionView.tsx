import { FC, useState, ReactNode, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'

import ResourceItem from '~/containers/course-section/resource-item/ResourceItem'
import AppTextField from '~/components/app-text-field/AppTextField'
import HeaderTextWithDropdown from '~/components/header-text-with-dropdown/HeaderTextWithDropdown'
import { styles } from '~/components/cooperation-section-view/CooperationSectionView.styles'

import { CourseSection, TextFieldVariantEnum } from '~/types'

interface CooperationSectionViewProps {
  item: CourseSection
}

const CooperationSectionView: FC<CooperationSectionViewProps> = ({ item }) => {
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState<boolean>(true)

  const resources = useMemo<undefined | ReactNode[]>(
    () =>
      item.resources?.map(({ resource, resourceType }) => (
        <ResourceItem
          isView
          key={resource.id}
          resource={resource}
          resourceType={resourceType}
        />
      )),
    [item.resources]
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
        <Box sx={styles.showBlock}>
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
