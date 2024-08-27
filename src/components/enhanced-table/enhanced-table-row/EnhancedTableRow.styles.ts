import palette from '~/styles/app-theme/app.pallete'

export const styles = {
  row: (isSelected: boolean, isRowOnClick = false, isDisableRow = false) => ({
    ...(isRowOnClick && { cursor: 'pointer' }),
    ...(isSelected && { background: palette.basic.grey }),
    '&:hover .addCategory': {
      visibility: 'visible'
    },
    ...(isDisableRow && {
      pointerEvents: 'none',
      opacity: 0.5
    })
  })
}
