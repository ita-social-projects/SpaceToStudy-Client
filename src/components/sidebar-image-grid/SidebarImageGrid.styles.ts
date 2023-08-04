export const styles = {
  imageGrid: {
    display: 'flex',
    gap: '13px',
    px: '16px',
    justifyContent: 'start'
  },
  imageWrapper: {
    m: '20px 10px'
  },
  modalImage: {
    width: '100%',
    borderRadius: '5px'
  },
  modalImageGrid: {
    display: 'grid',
    gridTemplateColumns: { xs: 'repeat(4, 1fr)', md: 'repeat(3, 1fr)' },
    gap: { xs: '10px', md: '5px' }
  }
}
