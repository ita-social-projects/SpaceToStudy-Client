import { FC, useMemo } from 'react'

import Box from '@mui/material/Box'
import { SxProps } from '@mui/material'

import Chip from '~scss-components/chip/Chip'
// import palette from '~/styles/app-theme/app.pallete'
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
  // color = palette.success[600], once the db gets updated
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
      <Chip
        detail={proficiencyLevelText}
        label={subject || ''}
        size='sm'
        type='category'
      ></Chip>
    </Box>
  )
}

export default SubjectLevelChips
