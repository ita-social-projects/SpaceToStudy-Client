import { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import AppChip from '~/components/app-chip/AppChip'
import palette from '~/styles/app-theme/app.pallete'
import { spliceSx } from '~/utils/helper-functions'

import { ProficiencyLevelEnum, SubjectLevelChipsSx } from '~/types'
import { styles } from '~/components/subject-level-chips/SubjectLevelChips.styles'

interface SubjectLevelChipsProps {
  cardSquareStyle: boolean
  sx?: SubjectLevelChipsSx
  proficiencyLevel: ProficiencyLevelEnum | ProficiencyLevelEnum[]
  subject: string
  color?: string
}

const SubjectLevelChips: FC<SubjectLevelChipsProps> = ({
  cardSquareStyle = false,
  proficiencyLevel,
  subject,
  color = palette.success[600],
  sx = {}
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
    <Box sx={spliceSx(styles.chips, sx?.chips)}>
      {cardSquareStyle && (
        <Box sx={styles.titleContainer}>
          <Typography sx={styles.title}>
            {t('offerCardSquare.chips.subject')}
          </Typography>
          <Typography sx={styles.title}>
            {t('offerCardSquare.chips.level')}
          </Typography>
        </Box>
      )}
      <Box sx={spliceSx(styles.chipsContainer, sx?.chipsContainer)}>
        <AppChip
          labelSx={styles.subjectChipLabel}
          sx={styles.subjectChip(color)}
        >
          {subject}
        </AppChip>
        <AppChip labelSx={styles.levelChipLabel} sx={styles.levelChip(color)}>
          {proficiencyLevelText}
        </AppChip>
      </Box>
    </Box>
  )
}

export default SubjectLevelChips
