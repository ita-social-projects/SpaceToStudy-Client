import palette from '~/styles/app-theme/app.pallete'

export const styles = {
  row: (isSelected: boolean, isRowOnClick = false) => ({
    ...(isRowOnClick && { cursor: 'pointer' }),
    ...(isSelected && { background: palette.basic.grey }),
    '&:hover .addCategory': {
      visibility: 'visible'
    }
  })
}
