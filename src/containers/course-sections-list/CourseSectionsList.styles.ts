import palette from '~/styles/app-theme/app.pallete'

export const styles = {
  section: (isDragging: boolean) => ({
    mb: '32px',
    backgroundColor: 'basic.white',
    borderRadius: '6px',
    ...(isDragging && {
      boxShadow: `0px 3px 16px 2px ${palette.primary[300]}`,
      border: `2px solid ${palette.primary[300]}`
    })
  }),
  dragIconWrapper: {
    paddingTop: '24px',
    display: 'flex',
    justifyContent: 'center'
  },
  dragIcon: {
    fontSize: '30px',
    transform: 'rotate(90deg)',
    color: 'primary.400',
    cursor: 'pointer'
  }
}
