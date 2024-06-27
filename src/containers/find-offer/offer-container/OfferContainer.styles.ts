export const styles = {
  offerContainer: (isGrid: boolean) => ({
    flexGrow: 1,
    my: '20px',
    display: 'grid',
    gap: '24px',
    gridTemplateColumns: isGrid
      ? {
          xs: '1fr',
          md: 'repeat(3, 1fr)'
        }
      : '1fr'
  }),
  gridItem: { width: '100%' },
  appCard: { padding: { sm: '20px', md: '30px 20px' } },
  appCardSquare: {
    minHeight: '460px',
    padding: '24px 20px'
  }
}
