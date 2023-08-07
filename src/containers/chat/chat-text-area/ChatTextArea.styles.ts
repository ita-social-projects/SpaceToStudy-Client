import palette from '~/styles/app-theme/app.pallete'
import { VisibilityEnum } from '~/types'

export const styles = {
  container: {
    display: 'flex',
    alignItems: 'end',
    columnGap: '16px',
    px: '16px'
  },
  textAreaWrapper: {
    flex: 1,
    backgroundColor: 'basic.white',
    borderRadius: '6px',
    p: '16px 32px',
    '& .MuiInputBase-root': { mt: 0 }
  },
  textArea: {
    userSelect: 'none',
    '& :hover': {
      '&::-webkit-scrollbar-track, &::-webkit-scrollbar-thumb': {
        visibility: 'hidden'
      }
    }
  },
  textAreaLabel: (value: string) => ({
    visibility: value ? VisibilityEnum.Hidden : VisibilityEnum.Visible,
    color: palette.primary[300],
    top: '-6px',
    left: '14px'
  }),
  icon: { width: '32px', height: '32px', color: 'primary.800' }
}
