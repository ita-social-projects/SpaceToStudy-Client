import { alpha } from '@mui/material/styles'

export const styles = {
  chips: {
    display: 'grid',
    gridTemplateColumns: 'max-content auto',
    gap: '5px'
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
    backgroundColor: alpha(color, 0.6)
  }),
  levelChip: (color: string) => ({
    backgroundColor: alpha(color, 0.2)
  }),
  labels: {
    fontWeight: '300',
    color: 'primary.400'
  }
}
