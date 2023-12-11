import palette from '~/styles/app-theme/app.pallete'
import { VisibilityEnum } from '~/types'

export const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: '16px',
    px: '16px'
  },
  testAreaWithPicker: { flex: 1, position: 'relative' },
  emojiPicker: {
    position: 'absolute',
    bottom: '90px',
    right: 0,
    zIndex: 2,
    '& > div *': {
      maxHeight: '300px',
      height: '100%'
    }
  },
  textAreaWrapper: {
    flex: 1,
    backgroundColor: 'basic.white',
    borderRadius: '6px',
    p: { xs: '16px 10px', sm: '16px 32px' }
  },
  textArea: {
    userSelect: 'none',
    '& .MuiInputBase-root': { p: '4px 0px 5px', mt: 0 },
    '& :hover': {
      '&::-webkit-scrollbar-track, &::-webkit-scrollbar-thumb': {
        visibility: 'hidden'
      }
    }
  },
  textAreaLabel: (value: string) => ({
    shrink: false,
    style: {
      visibility: value ? VisibilityEnum.Hidden : VisibilityEnum.Visible,
      color: palette.primary[300],
      top: '-6px'
    }
  }),
  icon: { width: '32px', height: '32px', color: 'primary.800' }
}
