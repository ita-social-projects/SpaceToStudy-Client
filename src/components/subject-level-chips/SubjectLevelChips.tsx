import { FC, useMemo } from 'react'

import Box from '@mui/material/Box'
import { SxProps } from '@mui/material'

import AppChip from '~/components/app-chip/AppChip'
import palette from '~/styles/app-theme/app.pallete'
import { spliceSx } from '~/utils/helper-functions'

import { ProficiencyLevelEnum } from '~/types'
import { styles } from '~/components/subject-level-chips/SubjectLevelChips.styles'

interface SubjectLevelChipsProps {
  sx?: SxProps
  proficiencyLevel: ProficiencyLevelEnum | ProficiencyLevelEnum[]
  subject?: string
  color?: string
}

const SubjectLevelChips: FC<SubjectLevelChipsProps> = ({
  proficiencyLevel,
  subject,
  color = palette.success[600],
  sx
}) => {
  const proficiencyLevelText = useMemo(() => {
    if (!Array.isArray(proficiencyLevel)) return proficiencyLevel
    if (proficiencyLevel.length === 1) return proficiencyLevel[0]
    return `${proficiencyLevel[0]} - ${
      proficiencyLevel[proficiencyLevel.length - 1]
    }`
  }, [proficiencyLevel])

  return (
    <Box sx={spliceSx(styles.chips, sx)}>
      <AppChip labelSx={styles.subjectChipLabel} sx={styles.subjectChip(color)}>
        {subject}
      </AppChip>
      <AppChip labelSx={styles.levelChipLabel} sx={styles.levelChip(color)}>
        {proficiencyLevelText}
      </AppChip>
    </Box>
  )
}

export default SubjectLevelChips
