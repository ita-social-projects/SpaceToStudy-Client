import { FC } from 'react'
import { ErrorOutlineRounded } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { Typography } from '@mui/material'

import CooperationActionBanner from '~/containers/my-cooperations/cooperation-action-banner/CooperationActionBanner'

import { styles } from './CooperationClosureDeclinedModal.styles'

export interface CooperationClosureDeclinedModalProps {
  message: string
  user: string
}

const CooperationClosureDeclinedModal: FC<
  CooperationClosureDeclinedModalProps
> = ({ message, user }) => {
  const { t } = useTranslation()

  return (
    <CooperationActionBanner
      description={
        <>
          <Typography component='span' sx={styles.boldText}>
            {user}
          </Typography>
          {` ${t('cooperationDetailsPage.cooperationCloseDeclinedMessage')}`}
          <Typography sx={styles.secondaryText}>{message}</Typography>
        </>
      }
      icon={<ErrorOutlineRounded />}
      title={t('titles.cooperationClosureDeclined')}
    />
  )
}

export default CooperationClosureDeclinedModal
