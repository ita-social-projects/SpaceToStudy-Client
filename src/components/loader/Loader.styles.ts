export const styles = {
  container: (pageLoad: boolean) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    flex: pageLoad ? 1 : 0
  }),
  loader: {
    color: 'basic.black'
  }
}
