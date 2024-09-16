import palette from '~/styles/app-theme/app.pallete'

export const styles = {
  wrapper: {
    width: { md: '160px', xs: '120px' },
    height: { md: '200px', xs: '180px' },
    borderRadius: '40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px'
  },
  avatarIcon: {
    minWidth: '100px',
    minHeight: '100px',
    borderRadius: '100%',
    fontSize: '20px'
  },
  chip: {
    background: palette.success[300],
    '& .MuiChip-label': {
      p: '0px 14px'
    }
  },
  chipLabel: {
    color: palette.success[900]
  },
  subjectNameWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '10px'
  },
  dot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: palette.success[900]
  }
}
