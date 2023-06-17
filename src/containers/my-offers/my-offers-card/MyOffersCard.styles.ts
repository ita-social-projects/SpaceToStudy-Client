const ellipsisTextStyle = (linesCount: number) => ({
  display: '-webkit-box',
  WebkitLineClamp: linesCount,
  lineClamp: linesCount,
  WebkitBoxOrient: 'vertical',
  boxOrient: 'vertical',
  overflow: 'hidden'
})

export const styles = {
  container: {
    width: '100%',
    minHeigth: '400px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    justifyContent: 'space-between'
  },
  title: {
    ...ellipsisTextStyle(2),
    typography: 'midTitle',
    fontWeight: 600,
    color: 'primary.700'
  },
  chipsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '5px'
  },
  subjectChipLabel: {
    typography: 'overline',
    fontWeight: 500
  },
  subjectChip: {
    mr: '4px',
    backgroundColor: 'green.300',
    color: 'green.900'
  },
  levelChipLabel: {
    typography: 'overline'
  },
  levelChip: {
    backgroundColor: 'green.50',
    color: 'primary.700'
  },
  priceContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    mt: 'auto'
  },
  titleWithDescription: {
    wrapper: {
      textAlign: 'left'
    },
    title: {
      typography: 'h6'
    },
    description: {
      typography: 'caption'
    }
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '9px'
  }
}
