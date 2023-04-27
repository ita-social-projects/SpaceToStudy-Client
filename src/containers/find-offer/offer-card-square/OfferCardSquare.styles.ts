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
    position: 'relative'
  },
  mainInfo: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    img: {
      width: '80px',
      borderRadius: '50%'
    },
    description: {
      ...ellipsisTextStyle(2),
      textAlign: 'left'
    },
    title: {
      mb: '5px',
      mt: '5px',
      typography: 'h6'
    },
    wrapper: {
      mb: '5px'
    }
  },
  iconButton: {
    color: 'basic.black',
    position: 'absolute',
    top: 0,
    right: 0
  },
  languagesContainer: {
    display: 'flex',
    alignItems: 'center',
    mb: '5px'
  },
  languageIcon: {
    color: 'primary.400',
    marginRight: '8px'
  },
  languages: {
    color: 'primary.400'
  },
  chipsContainer: {
    display: 'flex',
    mb: '50px'
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
    mb: '10px'
  },
  sendMessageButton: {
    width: '100%',
    mb: '16px'
  },
  viewDetailsButton: {
    backgroundColor: 'primary.50',
    color: 'primary.900',
    '&:hover': {
      backgroundColor: 'primary.50'
    }
  },
  componentStyles: {
    textAlign: 'left',
    margin: 0,
    mb: 0
  },
  descriptionStyles: { typography: 'caption' },
  titleStyles: { typography: 'h6', mb: 0 }
}
