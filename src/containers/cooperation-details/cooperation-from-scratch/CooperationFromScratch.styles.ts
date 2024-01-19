import palette from '~/styles/app-theme/app.pallete'

export const styles = {
  root: {
    border: `4px solid ${palette.basic.lightGray}`,
    borderRadius: { sm: '14px', xs: '10px' },
    p: { sm: '24px', xs: '12px' }
  },
  publishBlock: {
    display: 'flex',
    justifyContent: 'space-between',
    p: { sm: '20px', xs: '10px' },
    background: palette.basic.grey,
    borderRadius: { sm: '14px', xs: '10px' },
    mb: '15px'
  },
  lockBlock: {
    display: 'flex',
    alignItems: 'center',
    mb: '4px'
  },
  lockTitle: {
    ml: '8px',
    color: palette.basic.lightBlue,
    fontWeight: 500
  },
  lockSubtitle: {
    color: palette.basic.bismark
  },
  resourcesSelect: {
    width: { sm: '200px', xs: '120px' },
    cursor: 'pointer'
  },
  buttons: {
    display: 'flex',
    gap: { xs: '24px', sm: '30px' },
    justifyContent: 'end',
    alignSelf: { xs: 'center', sm: 'end' },
    mt: { xs: '5px', sm: '20px' }
  }
}
