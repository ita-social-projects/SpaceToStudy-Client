import { FC, useState, ReactNode, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'

import ResourceItem from '~/containers/course-section/resource-item/ResourceItem'
import AppTextField from '~/components/app-text-field/AppTextField'
import HeaderTextWithDropdown from '~/components/header-text-with-dropdown/HeaderTextWithDropdown'
import { styles } from '~/components/cooperation-section-view/CooperationSectionView.styles'
import {
  CourseSection,
  ResourcesTypesEnum,
  TextFieldVariantEnum
} from '~/types'

import {
  DescriptionOutlined,
  ListAlt,
  SvgIconComponent
} from '@mui/icons-material'
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined'
import { Typography } from '@mui/material'
import Divider from '@mui/material/Divider'

interface CooperationSectionViewProps {
  item: CourseSection
}

const CooperationSectionView: FC<CooperationSectionViewProps> = ({ item }) => {
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState<boolean>(true)

  const resources = useMemo<undefined | ReactNode[]>(
    () =>
      item.resources?.map(({ availability, resource, resourceType }) => (
        <ResourceItem
          availability={availability}
          isView
          key={resource.id}
          resource={resource}
          resourceType={resourceType}
        />
      )),
    [item.resources]
  )

  const renderResource = (IconComponent: SvgIconComponent, text: string) => {
    return (
      <Box sx={styles.resourceCount.wrapper}>
        <IconComponent sx={styles.resourceCount.icon} />
        <Typography sx={styles.resourceCount.text}>{text}</Typography>
      </Box>
    )
  }

  const resourceCounts = item.resources.reduce<
    Record<ResourcesTypesEnum, number>
  >(
    (acc, resource) => {
      acc[resource.resourceType] = (acc[resource.resourceType] || 0) + 1
      return acc
    },
    {
      [ResourcesTypesEnum.Lesson]: 0,
      [ResourcesTypesEnum.Quiz]: 0,
      [ResourcesTypesEnum.Attachment]: 0,
      [ResourcesTypesEnum.Question]: 0
    }
  )

  const lessons = renderResource(
    ListAlt,
    t('course.courseSection.resourceCount.lesson', {
      count: resourceCounts[ResourcesTypesEnum.Lesson]
    })
  )
  const quizzes = renderResource(
    NoteAltOutlinedIcon,
    t('course.courseSection.resourceCount.quiz', {
      count: resourceCounts[ResourcesTypesEnum.Quiz]
    })
  )
  const attachments = renderResource(
    DescriptionOutlined,
    t('course.courseSection.resourceCount.attachment', {
      count: resourceCounts[ResourcesTypesEnum.Attachment]
    })
  )

  return (
    <Box sx={styles.root}>
      <HeaderTextWithDropdown
        isView
        isVisible={isVisible}
        sectionData={item}
        setIsVisible={setIsVisible}
      />
      <Box sx={styles.resourceCount.container}>
        {resourceCounts[ResourcesTypesEnum.Lesson] > 0 && lessons}
        {resourceCounts[ResourcesTypesEnum.Quiz] > 0 && quizzes}
        {resourceCounts[ResourcesTypesEnum.Attachment] > 0 && attachments}
      </Box>
      {isVisible && (
        <>
          <Divider sx={styles.divider} />
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
        </>
      )}
    </Box>
  )
}

export default CooperationSectionView
