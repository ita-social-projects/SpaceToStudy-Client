import palette from '~/styles/app-theme/app.pallete'
import { TypographyVariantEnum } from '~/types'

const actionIconWrapper = {
  display: 'flex',
  alignItems: 'center'
}

const actionIcon = {
  fontSize: '18px',
  mr: '10px'
}

export const styles = {
  root: {
    background: 'basic.white',
    borderRadius: '6px',
    p: '24px'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  iconTitleDescription: {
    container: { display: 'flex', columnGap: '16px', alignItems: 'center' },
    icon: {
      svg: { width: '16px', height: '16px', color: 'primary.600' }
    },
    titleWithDescription: {
      wrapper: { display: 'flex', flexDirection: 'column', rowGap: '3px' },
      title: {
        typography: TypographyVariantEnum.Subtitle2,
        color: 'primary.900'
      },
      description: {
        typography: TypographyVariantEnum.Caption,
        color: 'primary.400'
      }
    }
  },
  iconWrapper: {
    backgroundColor: 'basic.grey',
    borderRadius: '4px',
    padding: '8px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  categoryChip: {
    backgroundColor: 'inherit',
    border: `2px solid ${palette.basic.turquoiseDark}`,
    borderRadius: '50px',
    '& .MuiChip-label': { p: '0px 8px' },
    my: '12px'
  },
  categoryChipLabel: {
    typography: TypographyVariantEnum.Caption,
    fontWeight: 500,
    color: 'basic.turquoiseDark'
  },
  divider: {
    mt: '8px',
    borderColor: 'primary.200'
  },
  questionBody: {
    my: '24px'
  },
  questionText: {
    typography: TypographyVariantEnum.MidTitle
  },
  answers: {
    display: 'flex',
    flexDirection: 'column'
  },
  answer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  moreIcon: {
    fontSize: '20px'
  },
  dragIconWrapper: {
    display: 'flex',
    justifyContent: 'center'
  },
  dragIcon: {
    fontSize: '30px',
    transform: 'rotate(90deg)',
    color: 'primary.400',
    cursor: 'pointer'
  },
  editIconWrapper: actionIconWrapper,
  deleteIconWrapper: { ...actionIconWrapper, color: 'error.700' },
  editIcon: actionIcon,
  deleteIcon: {
    ...actionIcon,
    color: 'error.700'
  },
  checkIcon: { color: 'basic.orientalHerbs' }
}
