export const styles = {
  container: {
    minHeight: '500px'
  },
  cardsContainer: {
    display: 'grid',
    gridTemplateColumns: {
      xs: 'repeat(auto-fit, 288px)',
      sm: 'repeat(auto-fit, 368px)'
    },
    gridAutoRows: '126px',
    gridGap: '24px',
    mb: '32px'
  },
  btn: {
    minWidth: '148px',
    display: 'block',
    m: '0 auto'
  }
}
