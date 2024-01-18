import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import AddIcon from '@mui/icons-material/Add'
import { PositionEnum } from '~/types'

import { styles } from '~/containers/my-cooperations/cooperation-notes/CooperationNotes.styles'

interface CooperationNotesProps {
  isNotesOpen: boolean
}

const CooperationNotes: FC<CooperationNotesProps> = ({ isNotesOpen }) => {
  const { t } = useTranslation()
  return (
    <>
      <Divider orientation={PositionEnum.Vertical} sx={styles.divider} />
      <Box sx={styles.notesWrapper(isNotesOpen)}>
        <Box sx={styles.notesIcon}>
          <Typography>{t('cooperationsPage.details.notes')}</Typography>
          <AddIcon />
        </Box>
      </Box>
    </>
  )
}

export default CooperationNotes
