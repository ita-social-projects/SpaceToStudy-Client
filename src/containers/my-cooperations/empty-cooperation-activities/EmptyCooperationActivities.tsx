import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import ImgTitleDescription from '~/components/img-title-description/ImgTitleDescription'

import { ComponentEnum, UserRole, UserRoleEnum } from '~/types'
import defaultImg from '~/assets/img/cooperation-details/default.svg'
import { styles } from '~/containers/my-cooperations/empty-cooperation-activities/EmptyCooperationActivities.styles'
import { useAppSelector } from '~/hooks/use-redux'
import EmptyCooperationTutorControls from '~/containers/my-cooperations/empty-cooperation-activities/EmptyCooperationTutorControls'
import { componentDescription } from '~/containers/my-cooperations/empty-cooperation-activities/EmptyCooperation.constants'
import { ReactNode } from 'react'

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
    <Typography component={ComponentEnum.Span} key={text} sx={styles.weightBox}>
      {t(`cooperationsPage.${from}.${text}`, { context })}
    </Typography>
  )

  let description: ReactNode = ''
  const textDescriptionArray =
    componentDescription[userRole as Exclude<UserRole, UserRoleEnum.Admin>]

  if (userRole in componentDescription) {
    description = textDescriptionArray.map(({ text, isSpan }) =>
      isSpan
        ? createDescriptionSpan({ text })
        : t(`cooperationsPage.description.${text}`)
    )
  }

  return (
    <Box sx={styles.logoBlock}>
      <ImgTitleDescription
        description={description}
        img={defaultImg}
        style={styles}
      />
      {userRole === UserRoleEnum.Tutor && <EmptyCooperationTutorControls />}
    </Box>
  )
}

export default EmptyCooperationActivities
