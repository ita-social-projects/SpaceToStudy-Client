import palette from '~/styles/app-theme/app.pallete'

export const styles = {
  downloadIcon: (loading: boolean) => ({
    color: loading ? palette.basic.blueGray : palette.basic.black,
    fontWeight: loading ? 500 : 600,
    fontSize: '15px'
  }),
  iconImage: {
    marginTop: '-3px'
  }
}
