import { alpha } from '@mui/material/styles'

export const styles = {
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'start',
    gap: '4px'
  },
  subjectChipLabel: {
    typography: 'overline',
    fontWeight: '500',
    color: 'primary.900'
  },
  levelChipLabel: {
    typography: 'overline'
  },
  subjectChip: (color: string) => ({
    backgroundColor: alpha(color, 0.6),
    cursor: 'inherit'
  }),
  levelChip: (color: string) => ({
    backgroundColor: alpha(color, 0.2),
    cursor: 'inherit'
  })
}
