import theme from '~/styles/app-theme/custom-mui.styles'

export const whatCanYouDoStyles = {
  container: {
    marginTop: '164px',
    marginBottom: '174px',
    textAlign: 'center'
  },
  title: {
    marginBottom: '32px',
    fontSize: '48px',
    fontWeight: 700,
    lineHeight: '56px',
  },
  description: {
    marginBottom: '40px',
    fontSize: '18px',
    fontWeight: 400,
    lineHeight: '26px',
  },
  cards: {
    display: 'flex',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
    maxWidth: '1124px',
    margin: '0 auto',
    padding: '52px 105px',
    backgroundColor: theme.palette.primary[50],
    borderRadius: '20px'
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxSizing: 'border-box',
    maxWidth: '427px',
    padding: '24px',
    backgroundColor: theme.palette.basic.white,
    boxShadow: theme.shadows.primary,
    borderRadius: '6px',
  },
  cardImg: {
    marginBottom: '24px'
  },
  cardTitle: {
    marginBottom: '16px',
    fontSize: '30px',
    fontWeight: 600,
    lineHeight: '45px',
  },
  cardDescription: {
    marginBottom: '24px',
  }
}
