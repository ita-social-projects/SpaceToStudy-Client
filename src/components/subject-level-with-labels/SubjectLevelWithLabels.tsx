import { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import { SxProps } from '@mui/material'
import Typography from '@mui/material/Typography'

import AppChip from '~/components/app-chip/AppChip'
import palette from '~/styles/app-theme/app.pallete'
import { spliceSx } from '~/utils/helper-functions'

import { ProficiencyLevelEnum } from '~/types'
import { styles } from '~/components/subject-level-with-labels/SubjectLevelWithLabels.styles'

interface SubjectLevelChipsProps {
  sx?: SxProps
  proficiencyLevel: ProficiencyLevelEnum | ProficiencyLevelEnum[]
  subject: string
  color?: string
}

const SubjectLevelWithlabels: FC<SubjectLevelChipsProps> = ({
  proficiencyLevel,
  subject,
  color = palette.success[600],
  sx
}) => {
  const { t } = useTranslation()

  const proficiencyLevelText = useMemo(() => {
    if (!Array.isArray(proficiencyLevel)) return proficiencyLevel
    if (proficiencyLevel.length === 1) return proficiencyLevel[0]
    return `${proficiencyLevel[0]} - ${
      proficiencyLevel[proficiencyLevel.length - 1]
    }`
  }, [proficiencyLevel])

  return (
    <Box sx={spliceSx(styles.chips, sx)}>
      <Typography sx={styles.labels}>{t('common.labels.subject')}</Typography>
      <Box>
        <AppChip
          labelSx={styles.subjectChipLabel}
          sx={styles.subjectChip(color)}
        >
          {subject}
        </AppChip>
      </Box>
      <Typography sx={styles.labels}>{t('common.labels.level')}</Typography>
      <Box>
        <AppChip labelSx={styles.levelChipLabel} sx={styles.levelChip(color)}>
          {proficiencyLevelText}
        </AppChip>
      </Box>
    </Box>
  )
}

export default SubjectLevelWithlabels
