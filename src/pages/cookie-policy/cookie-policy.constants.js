import { styles } from './cookie-policy.styles'

export const sectionTitleVariant = {
  md: 'h4',
  xs: 'h5'
}
export const cookieItemsTitleVariant = {
  md: 'h5',
  xs: 'h5'
}
export const descriptionVariant = {
  md: 'body1',
  xs: 'body2'
}
export const textWithDotVariant = {
  xlg: 'subtitle1'
}

const thirdPartyCookiesStyles = {
  ...styles,
  subtitleWrapper: {
    display: 'flex',
    flexDirection: 'column-reverse'
  }
}

export const cookieItemsData = [
  {
    id: 1,
    title: 'cookiePolicyPage.cookiePolicy.title',
    description: 'cookiePolicyPage.cookiePolicy.description'
  },
  {
    id: 2,
    title: 'cookiePolicyPage.whatAreCookies.title',
    description: 'cookiePolicyPage.whatAreCookies.description',
    styleProp: styles
  },
  {
    id: 3,
    title: 'cookiePolicyPage.HowWeUseCookies.title',
    description: 'cookiePolicyPage.HowWeUseCookies.description',
    styleProp: styles
  },
  {
    id: 4,
    title: 'cookiePolicyPage.DisablingCookies.title',
    description: 'cookiePolicyPage.DisablingCookies.description',
    styleProp: styles
  },
  {
    id: 5,
    title: 'cookiePolicyPage.TheCookiesWeSet.title',
    textWithDot: 'cookiePolicyPage.TheCookiesWeSet.Account.title',
    description: 'cookiePolicyPage.TheCookiesWeSet.Account.description',
    styleProp: styles
  },
  {
    id: 6,
    textWithDot: 'cookiePolicyPage.TheCookiesWeSet.Login.title',
    description: 'cookiePolicyPage.TheCookiesWeSet.Login.description',
    styleProp: styles
  },
  {
    id: 7,
    textWithDot: 'cookiePolicyPage.TheCookiesWeSet.Site.title',
    description: 'cookiePolicyPage.TheCookiesWeSet.Site.description',
    styleProp: styles
  },
  {
    id: 8,
    title: 'cookiePolicyPage.ThirdPartyCookies.title',
    textWithDot: 'cookiePolicyPage.ThirdPartyCookies.textWithDot',
    description: 'cookiePolicyPage.ThirdPartyCookies.description',
    styleProp: thirdPartyCookiesStyles
  },
  {
    id: 9,
    title: 'cookiePolicyPage.MoreInformation.title',
    textWithDot: 'cookiePolicyPage.MoreInformation.textWithDot',
    styleProp: styles
  }
]
