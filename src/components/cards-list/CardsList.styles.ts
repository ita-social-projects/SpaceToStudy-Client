export const styles = {
  cardsContainer: {
    display: 'grid',
    justifyContent: 'center',
    gridTemplateColumns: {
      xs: 'repeat(1, minmax(264px, 1fr))',
      sm: 'repeat(2, minmax(264px, 1fr))',
      md: 'repeat(3, minmax(264px, 1fr))',
      lg: 'repeat(4, minmax(264px, 1fr))'
    },
    gridAutoRows: '112px',
    gridGap: '24px'
  },
  btn: {
    minWidth: '148px',
    display: 'block',
    m: '32px auto 0'
  },
  loaderContainer: {
    minHeight: '350px',
    display: 'flex'
  }
}
