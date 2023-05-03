export const styles = {
  container: (pageLoad: boolean) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'backgroundColor',
    flex: pageLoad ? 1 : 0
  }),
  loader: {
    color: 'basic.black'
  }
}
