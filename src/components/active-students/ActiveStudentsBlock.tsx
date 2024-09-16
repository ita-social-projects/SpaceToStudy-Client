import { Typography } from '@mui/material'
import Box from '@mui/system/Box'
import { useCallback } from 'react'

import useAxios from '~/hooks/use-axios'
import { cooperationService } from '~/services/cooperation-service'
import { defaultResponse } from '~/pages/my-cooperations/MyCooperations.constants'
import Loader from '../loader/Loader'
import { Cooperation, ItemsWithCount } from '~/types'
import ActiveStudent from './ActiveStudent'
import AppIconButton from '../app-icon-button/AppIconButton'
import { MoreHoriz } from '@mui/icons-material'
import { styles } from './ActiveStudentsBlock.styles'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const ActiveStudentsBlock = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const getMyCooperations = useCallback(
    () => cooperationService.getCooperations({ limit: 3, status: 'active' }),
    []
  )

  const { loading, response, error } = useAxios<ItemsWithCount<Cooperation>>({
    service: getMyCooperations,
    defaultResponse
  })

  if (loading) return <Loader pageLoad size={50} />
  if (error || !response.items.length) return null

  const activeStudents = response.items.map((cooperation) => (
    <ActiveStudent
      cooperationId={cooperation._id}
      firstName={cooperation.user.firstName}
      key={cooperation._id}
      lastName={cooperation.user.lastName}
      photo={cooperation.user.photo}
      subjectName={cooperation.offer.subject.name}
    />
  ))

  const onShowMoreClick = () => {
    navigate('/my-cooperations')
  }

  return (
    <>
      <Typography sx={styles.title}>{t('activeStudents.title')}</Typography>
      <Box sx={styles.activeStudentsWrapper}>
        {activeStudents}
        <Box
          data-testid='showMore'
          onClick={onShowMoreClick}
          sx={styles.showMoreWrapper}
        >
          <AppIconButton size='medium' sx={styles.showMoreButton}>
            <MoreHoriz />
          </AppIconButton>
          <Typography>{t('activeStudents.showMore')}</Typography>
        </Box>
      </Box>
    </>
  )
}

export default ActiveStudentsBlock
