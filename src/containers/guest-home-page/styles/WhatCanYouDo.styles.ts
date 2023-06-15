export const styles = {
  cards: {
    display: 'flex',
    flexDirection: {
      sm: 'row',
      xs: 'column'
    },
    justifyContent: 'center',
    alignItems: { xs: 'center', sm: 'stretch' },
    columnGap: {
      lg: '64px',
      sm: '24px'
    },
    rowGap: '24px',
    py: {
      lg: '52px',
      sm: '48px',
      xs: '32px'
    },
    px: {
      lg: '52px',
      sm: '32px',
      xs: '16px'
    },
    backgroundColor: 'primary.50',
    borderRadius: {
      md: '20px',
      xs: '16px'
    }
  },
  titleWithDescription: {
    wrapper: {
      marginBottom: '32px',
      textAlign: 'center'
    },
    title: {
      typography: { md: 'h3', xs: 'h4' },
      marginBottom: '16px'
    },
    description: {
      typography: { xs: 'subtitle1' }
    }
  }
}
