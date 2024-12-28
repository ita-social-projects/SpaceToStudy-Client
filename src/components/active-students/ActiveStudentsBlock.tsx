import { Typography } from '@mui/material'
import Box from '@mui/system/Box'
import useQuery from '~/hooks/use-query'

import { cooperationService } from '~/services/cooperation-service'
import { defaultResponse } from '~/pages/my-cooperations/MyCooperations.constants'
import Loader from '../loader/Loader'
import { Cooperation, ItemsWithCount } from '~/types'
import ActiveStudent from './ActiveStudent'
import AppIconButton from '../app-icon-button/AppIconButton'
import { Add, MoreHoriz } from '@mui/icons-material'
import { styles } from './ActiveStudentsBlock.styles'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const ActiveStudentsBlock = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const fetchMyCooperations = async (): Promise<
    ItemsWithCount<Cooperation>
  > => {
    const response = await cooperationService.getCooperations({
      limit: 3,
      status: 'active'
    })
    return response.data as ItemsWithCount<Cooperation>
  }

  const {
    data = defaultResponse,
    isLoading,
    isError
  } = useQuery<ItemsWithCount<Cooperation>, Error>({
    queryKey: ['myCooperations', { limit: 3, status: 'active' }],
    queryFn: fetchMyCooperations
  })

  if (isLoading) return <Loader pageLoad size={50} />
  if (isError) return null

  const onShowMoreClick = () => {
    navigate('/my-cooperations')
  }

  const onAddStudentClick = () => {
    navigate('/categories/subjects/find-offers')
  }

  if (!data.items.length)
    return (
      <>
        <Typography sx={styles.title}>{t('activeStudents.title')}</Typography>
        <Box sx={styles.noStudentsWrapper}>
          <Typography sx={styles.title}>
            {t('activeStudents.noStudentsYet')}
          </Typography>
          <Box
            data-testid='addStudent'
            onClick={onAddStudentClick}
            sx={styles.showMoreWrapper}
          >
            <AppIconButton size='medium' sx={styles.showMoreButton}>
              <Add />
            </AppIconButton>
            <Typography>{t('activeStudents.addStudent')}</Typography>
          </Box>
        </Box>
      </>
    )

  const activeStudents = data.items.map((cooperation) => (
    <ActiveStudent
      cooperationId={cooperation._id}
      firstName={cooperation.user.firstName}
      key={cooperation._id}
      lastName={cooperation.user.lastName}
      photo={cooperation.user.photo}
      subjectName={cooperation.offer.subject.name}
    />
  ))

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
