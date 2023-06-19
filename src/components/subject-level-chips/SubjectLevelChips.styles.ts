import { alpha } from '@mui/material/styles'

export const styles = {
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'start',
    gap: '10px',
    mb: '0'
  },
  chipsContainer: {
    display: 'flex',
    gap: '4px',
    m: '10px 0'
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: '100%'
  },
  title: {
    color: 'primary.500',
    textTransform: 'uppercase',
    fontSize: '10px'
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
