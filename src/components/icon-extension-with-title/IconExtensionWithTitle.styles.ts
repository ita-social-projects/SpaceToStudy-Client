import { TypographyVariantEnum } from '~/types'

export const styles = {
  container: {
    display: 'flex',
    alignItems: 'center'
  },
  iconBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '40px',
    height: '40px',
    backgroundColor: 'basic.turquoise',
    borderRadius: '5px',
    marginRight: '20px',
    color: 'basic.white',
    fontSize: '12px',
    typography: TypographyVariantEnum.Caption
  },
  inputWithIcons: {
    display: 'flex',
    columnGap: '10px',
    flex: 1
  },
  input: {
    flex: 1,
    typography: TypographyVariantEnum.Subtitle2
  },
  actionIcon: (color: string) => ({
    width: '16px',
    height: '16px',
    p: '4px',
    borderRadius: '6px',
    color: `${color}.700`,
    backgroundColor: `${color}.100`
  }),
  titleWithDescription: {
    title: {
      typography: TypographyVariantEnum.Subtitle2
    },
    description: {
      typography: TypographyVariantEnum.Caption,
      color: 'primary.500'
    }
  }
}
