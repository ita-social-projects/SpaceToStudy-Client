import palette from '~/styles/app-theme/app.pallete'

export const styles = {
  question: (isDragging: boolean) => ({
    mb: '32px',
    backgroundColor: 'basic.white',
    borderRadius: '6px',
    ...(isDragging && {
      boxShadow: `0px 3px 16px 2px ${palette.primary[300]}`,
      border: `2px solid ${palette.primary[300]}`
    })
  })
}
