import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import ImgTitleDescription from '~/components/img-title-description/ImgTitleDescription'

import { ComponentEnum, UserRoleEnum } from '~/types'
import defaultImg from '~/assets/img/cooperation-details/default.svg'
import { styles } from '~/containers/my-cooperations/empty-cooperation-activities/EmptyCooperationActivities.styles'
import { useAppSelector } from '~/hooks/use-redux'
import EmptyCooperationTutorControls from '~/containers/my-cooperations/empty-cooperation-activities/EmptyCooperationTutorControls'
import { ReactElement } from 'react'

const EmptyCooperationActivities = () => {
  const { userRole } = useAppSelector((state) => state.appMain)
  const { t } = useTranslation()

  const createDescriptionSpan = ({
    text,
    context,
    from = 'description'
  }: {
    text: string
    context?: string
    from?: string
  }) => (
    <Typography component={ComponentEnum.Span} sx={styles.weightBox}>
      {t(`cooperationsPage.${from}.${text}`, { context })}
    </Typography>
  )

  const componentDescription: Partial<
    Record<UserRoleEnum, string | ReactElement>
  > = {
    [UserRoleEnum.Tutor]: (
      <>
        {t('cooperationsPage.description.existingCourse')}
        {createDescriptionSpan({ text: 'courseTemplate' })}
        {t('cooperationsPage.description.resourceLibrary')}
        {createDescriptionSpan({ text: 'module' })}
        {t('cooperationsPage.description.fillThis')}
        {createDescriptionSpan({ text: 'lessons' })}
        {t('cooperationsPage.description.or')}
        {createDescriptionSpan({ text: 'quizzes' })}
        {t('cooperationsPage.description.resourcesLibrary')}
      </>
    ),
    [UserRoleEnum.Student]: (
      <>
        {t('cooperationsPage.description.studentEmptyCooperation')}{' '}
        {createDescriptionSpan({
          text: 'notes',
          from: 'details',
          context: 'where'
        })}
      </>
    )
  }
  return (
    <Box sx={styles.logoBlock}>
      <ImgTitleDescription
        description={userRole && componentDescription[userRole]}
        img={defaultImg}
        style={styles}
      />
      {userRole === UserRoleEnum.Tutor && <EmptyCooperationTutorControls />}
    </Box>
  )
}

export default EmptyCooperationActivities
