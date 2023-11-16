import { ellipsisTextStyle } from '~/utils/helper-functions'

export const styles = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    maxWidth: '312px',
    minHeight: '245px',
    backgroundColor: 'basic.white',
    borderRadius: '6px',
    p: '24px 24px 16px 24px'
  },
  title: {
    ...ellipsisTextStyle(2),
    fontWeight: '600',
    lineHeight: '24px',
    letterSpacing: '0.15px'
  },
  description: {
    ...ellipsisTextStyle(2),
    m: '8px 0px'
  },
  secondaryText: {
    color: 'basic.turquoiseDark',
    m: '8px 0px'
  },
  dateContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  line: {
    m: '16px 0'
  },
  chipContainer: {
    position: 'relative'
  }
}
