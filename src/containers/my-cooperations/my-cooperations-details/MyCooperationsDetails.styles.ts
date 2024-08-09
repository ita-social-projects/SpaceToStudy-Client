import palette from '~/styles/app-theme/app.pallete'
import { TypographyVariantEnum } from '~/types'
import { ellipsisTextStyle } from '~/utils/helper-functions'

export const style = {
  header: {
    typography: TypographyVariantEnum.H6,
    color: palette.basic.blueGray,
    mr: '30px'
  },
  userButtons: {
    display: 'flex',
    flexDirection: 'row'
  },
  titles: {
    color: palette.basic.blueGray
  },
  title: {
    fontWeight: '600',
    ...ellipsisTextStyle(1)
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, max-content)',
    gap: '40px',
    padding: '10px 0 ',
    mt: '20px'
  },
  profileContainer: {
    display: 'flex',
    alignItems: 'center',
    p: '0 0 10px',
    mb: '5px',
    '& > *': {
      mr: '30px'
    }
  },
  profileName: {
    fontWeight: '500'
  },
  profileDescription: {
    maxWidth: '700px',
    ...ellipsisTextStyle(2)
  },
  subjectContainer: {
    display: 'flex',
    '& > *': {
      mr: '10px'
    }
  },
  buttons: {
    mr: '15px',
    color: 'basic.black',
    diplay: 'flex',
    alignItems: 'center',
    '& > svg': {
      fontSize: '20px',
      mr: '5px'
    }
  },
  languageContainer: {
    display: 'flex',
    '& > *': {
      mr: '15px'
    }
  },
  languageItem: {
    display: 'flex'
  },
  aboutCooperation: {
    maxWidth: '900px'
  },
  iconColor: (color: string) => ({
    color: color
  })
}
