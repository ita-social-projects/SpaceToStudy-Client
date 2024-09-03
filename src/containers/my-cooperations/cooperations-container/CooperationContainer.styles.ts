import { TypographyVariantEnum } from '~/types'

export const roundedBorderTable = {
  '& td,th': {
    '&:first-of-type': {
      borderTopLeftRadius: '10px',
      borderBottomLeftRadius: '10px'
    },
    '&:last-of-type': {
      borderTopRightRadius: '10px',
      borderBottomRightRadius: '10px'
    }
  }
}

export const styles = {
  root: {
    display: 'grid',
    gridTemplateColumns: {
      xs: '1fr',
      sm: 'repeat(2,1fr)',
      md: 'repeat(3,1fr)',
      lg: 'repeat(4,1fr)'
    },
    gridAutoRows: 'auto',
    gap: '20px',
    mb: '40px'
  },
  chips: { flexDirection: 'column' },
  table: roundedBorderTable,
  profileInfo: {
    avatar: {
      height: '40px',
      width: '40px',
      ml: '4px'
    },
    root: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    name: {
      typography: TypographyVariantEnum.Body2,
      color: 'primary.900'
    }
  },
  title: {
    maxWidth: '360px',
    wordBreak: 'break-word'
  }
}
