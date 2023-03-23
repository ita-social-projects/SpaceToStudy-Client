export const styles = {
  wrapper:{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  cardsContainer: {
    display: 'grid',
    gridTemplateColumns: {
      xs: 'repeat(auto-fit, minmax(288px, 1fr))',
      sm: 'repeat(auto-fit, minmax(360px, 1fr))'
    },
    gridAutoRows: '126px',
    gridGap: '24px',
    mb: '32px'
  }
}
