import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import SubjectLevelChips from '~/components/subject-level-chips/SubjectLevelChips'
import { spliceSx } from '~/utils/helper-functions'

import { ProficiencyLevelEnum, SubjectLevelChipsSx } from '~/types'
import { styles } from '~/components/subject-level-with-labels/SubjectLevelWithLabels.styles'

interface SubjectLevelChipsProps {
  sx?: SubjectLevelChipsSx
  proficiencyLevel: ProficiencyLevelEnum | ProficiencyLevelEnum[]
  subject: string
  color?: string
}

const SubjectLevelWithlabels: FC<SubjectLevelChipsProps> = ({
  proficiencyLevel,
  subject,
  color,
  sx
}) => {
  const { t } = useTranslation()

  return (
    <Box sx={spliceSx(styles.container, sx?.container)}>
      <Box sx={styles.labels}>
        <Typography sx={spliceSx(styles.label, sx?.label)}>
          {t('common.labels.subject')}
        </Typography>
        <Typography sx={spliceSx(styles.label, sx?.label)}>
          {t('common.labels.level')}
        </Typography>
      </Box>
      <SubjectLevelChips
        color={color}
        proficiencyLevel={proficiencyLevel}
        subject={subject}
        sx={styles.chips}
      />
    </Box>
  )
}

export default SubjectLevelWithlabels
