import palette from '~/styles/app-theme/app.pallete'
import { TypographyVariantEnum } from '~/types'

export const styles = {
  cooperationTitle: {
    title: {
      typography: TypographyVariantEnum.H5,
      mb: '24px',
      mt: '16px',
      width: { sm: '100%', md: '70%' }
    }
  },
  notesSidebar: {
    '& .MuiDrawer-root': {
      position: 'absolute'
    },
    '& .MuiDivider-root': {
      display: 'none'
    },
    '& .css-1qi76ds-MuiPaper-root-MuiDrawer-paper': {
      pt: '62px'
    }
  },
  tabsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid',
    borderColor: 'primary.100',
    mb: '24px'
  },
  pageContent: {
    flex: 1
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
    fontSize: '16px',
    color: isNotesOpen ? palette.basic.lightBlue : palette.basic.blueGray,
    textDecoration: isNotesOpen ? 'underline' : ''
  }),
  notesBlock: {
    display: 'flex'
  },
  tabs: {
    root: {
      borderBottom: '0px',
      mb: '0px',
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
