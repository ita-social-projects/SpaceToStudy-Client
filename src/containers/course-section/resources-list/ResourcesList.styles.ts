import palette from '~/styles/app-theme/app.pallete'

export const styles = {
  root: {
    position: 'relative',
    mb: '32px'
  },
  section: (isDragging: boolean) => ({
    position: 'relative',
    backgroundColor: 'basic.white',
    borderRadius: '6px',
    zIndex: isDragging ? 10 : 1,
    ...(isDragging && {
      boxShadow: `0px 3px 16px 2px ${palette.primary[300]}`,
      border: `2px solid ${palette.primary[300]}`,
      '& .dragIcon': {
        color: 'primary.400'
      }
    })
  }),
  dragIcon: {
    left: '24px',
    position: 'absolute',
    top: '24px',
    color: 'primary.700',
    touchAction: 'none',
    cursor: 'grab',
    '&:hover': {
      color: 'primary.400'
    }
  }
}
