import palette from '~/styles/app-theme/app.pallete'

export const styles = {
  accordion: {
    withIcon: {
      root: {
        borderRadius: '4px'
      },
      accordion: {
        boxShadow: 'none',
        border: `1px solid ${palette.primary[100]}`
      },
      active: {
        mb: 1
      }
    }
  }
}
