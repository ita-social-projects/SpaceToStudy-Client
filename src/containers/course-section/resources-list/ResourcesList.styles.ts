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
    ...(isDragging && {
      boxShadow: `0px 3px 16px 2px ${palette.primary[300]}`,
      border: `2px solid ${palette.primary[300]}`
    }),
    '&:hover .dragIcon': {
      visibility: 'visible'
    }
  }),
  dragIcon: {
    left: '-10px',
    position: 'absolute',
    top: '24px',
    visibility: 'hidden',
    color: 'primary.400'
  }
}
