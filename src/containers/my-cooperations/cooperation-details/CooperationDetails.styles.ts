import palette from '~/styles/app-theme/app.pallete'

export const styles = {
  notesSidebar: {
    '& .MuiDrawer-root': {
      position: 'absolute'
    },
    '& .MuiPaper-root': {
      p: '25px',
      maxWidth: '400px',
      width: '100%'
    },
    '& .MuiDivider-root': {
      display: 'none'
    },
    '& .MuiBox-root': {
      mt: '25px',
      width: '100%'
    }
  },
  tabsWrapper: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  pageContent: {
    width: { md: '1340px', sm: '980px' }
  },
  banner: (isNotesOpen: boolean) => ({
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    mb: '10px',
    color: isNotesOpen ? palette.basic.lightBlue : palette.basic.blueGray,
    transform: isNotesOpen ? 'translateX(-300px)' : 'translateX(0)',
    transition: 'transform 0.3s ease-in-out, color 0.3s ease-in-out'
  }),
  notes: (isNotesOpen: boolean) => ({
    p: '10px 8px',
    fontSize: '16px',
    color: isNotesOpen ? palette.basic.lightBlue : palette.basic.blueGray,
    textDecoration: isNotesOpen ? 'underline' : ''
  }),
  notesBlock: {
    display: 'flex'
  },
  tabs: {
    root: {
      '& > button': {
        minWidth: '100px'
      },
      '& > button:first-of-type': {
        minWidth: '70px'
      },
      '& > button:last-child': {
        position: 'relative'
      },
      '& > button:nth-of-type(2):before': {
        content: '" "',
        position: 'absolute',
        height: '32px',
        left: 0,
        borderLeft: `1px solid ${palette.primary[100]}`
      }
    }
  }
}
