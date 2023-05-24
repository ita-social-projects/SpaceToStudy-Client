import palette from '~/styles/app-theme/app.pallete'

export const styles = {
  root: { mb: '24px' },
  title: {
    textAlign: 'center',
    color: 'primary.900',
    mb: '24px',
    typography: { xs: 'h5', sm: 'h4' }
  },
  dotStyles: (isDesktop: boolean) => ({
    display: isDesktop ? 'none' : 'block'
  }),
  button: (isDesktop: boolean, side: string) => ({
    display: !isDesktop ? 'none' : 'inline-flex',
    [side]: '-34px',
    stroke: palette.primary[500],
    strokeWidth: 2
  }),
  arrow: { typography: 'h5', color: 'primary.500' },
  offerCard: { p: '20px', minHeight: '480px' }
}
