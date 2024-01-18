import palette from '~/styles/app-theme/app.pallete'
import { breakpointsTheme } from '~/styles/app-theme/custom-mui.styles'

export const styles = {
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
    transform: isNotesOpen ? 'translateX(-200px)' : 'translateX(0)',
    transition: 'transform 0.3s ease-in-out, color 0.3s ease-in-out',
    [breakpointsTheme.breakpoints.between('md', 'lg')]: {
      transform: isNotesOpen && 'translateX(-150px)'
    },
    [breakpointsTheme.breakpoints.between('sm', 'md')]: {
      transform: isNotesOpen && 'translateX(-100px)'
    },
    [breakpointsTheme.breakpoints.between('xs', 'sm')]: {
      transform: isNotesOpen && 'translateX(0)'
    }
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
