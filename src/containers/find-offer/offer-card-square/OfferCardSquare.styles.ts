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
    titleWithDescription: {
      wrapper: {
        mb: '5px'
      },
      title: {
        textAlign: 'center',
        my: '5px',
        typography: 'h6'
      },
      description: {
        ...ellipsisTextStyle(2),
        textAlign: 'left'
      }
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
    flexWrap: 'wrap',
    gap: '5px',
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
    gap: '16px'
  }
}
