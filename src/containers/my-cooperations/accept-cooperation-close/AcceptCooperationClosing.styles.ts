import palette from '~/styles/app-theme/app.pallete'

export const styles = {
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    border: `1px solid ${palette.basic.pinkishRed}`,
    backgroundColor: palette.basic.softGray,
    borderRadius: '5px',
    padding: '24px',
    gap: '16px'
  },
  span: {
    fontWeight: '500'
  },
  title: {
    color: palette.basic.mediumRed,
    fontWeight: '500',
    display: 'flex',
    flexDirection: 'row',
    gap: '8px',
    mb: '4px'
  },
  body: {
    color: palette.basic.darkGray
  },
  button: {
    color: `${palette.basic.deepRed} !important`,
    backgroundColor: `${palette.basic.lightRed} !important`
  }
}
