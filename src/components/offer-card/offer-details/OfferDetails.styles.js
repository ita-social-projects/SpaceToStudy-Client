const ellipsisTextStyle = (linesCount) => ({
  display: '-webkit-box',
  WebkitLineClamp: linesCount,
  lineClamp: linesCount,
  WebkitBoxOrient: 'vertical',
  boxOrient: 'vertical',
  overflow: 'hidden'
})

export const styles = {
  bio: {
    ...ellipsisTextStyle(2),
    mb: '10px'
  },
  title: {
    color: 'primary.700'
  },
  chipsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '5px',
    my: '10px'
  },
  subjectChip: {
    mr: '4px',
    backgroundColor: 'green.300',
    color: 'green.900'
  },
  levelChip: {
    backgroundColor: 'green.50',
    color: 'primary.700'
  },
  subjectChipLabel: {
    typography: 'overline',
    fontWeight: 500
  },
  levelChipLabel: {
    typography: 'overline'
  },
  description: {
    ...ellipsisTextStyle(4),
    color: 'primary.600',
    mb: '10px'
  }
}
