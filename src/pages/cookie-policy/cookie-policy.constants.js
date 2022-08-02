import { styles } from './cookie-policy.styles'

const sectionTitleVariant = { 
  typography: { md: 'h4', xs: 'h5' } 
}
const titleVariant = {
  typography: { md: 'h5', xs: 'h5' }
}
const titleWithDotVariant = {
  typography: { xlg: 'subtitle1' }
}
const descriptionVariant = {
  typography: { md: 'body1', xs: 'body2' }
}

const titleWithDotStyles = {
  title: { 
    ...styles.titleWithDot 
  },
  wrapper: { 
    ...styles.wrapper
  }
}

export const cookieItemsData = [
  {
    id: 1,
    title: 'cookiePolicyPage.cookiePolicy.title',
    description: 'cookiePolicyPage.cookiePolicy.description',
    titleStyles: sectionTitleVariant,
    descriptionStyles: descriptionVariant
  },
  {
    id: 2,
    title: 'cookiePolicyPage.whatAreCookies.title',
    description: 'cookiePolicyPage.whatAreCookies.description',
    componentStyles: styles,
    titleStyles: titleVariant,
    descriptionStyles: descriptionVariant
  },
  {
    id: 3,
    title: 'cookiePolicyPage.HowWeUseCookies.title',
    description: 'cookiePolicyPage.HowWeUseCookies.description',
    componentStyles: styles,
    titleStyles: titleVariant,
    descriptionStyles: descriptionVariant
  },
  {
    id: 4,
    title: 'cookiePolicyPage.DisablingCookies.title',
    description: 'cookiePolicyPage.DisablingCookies.description',
    componentStyles: styles,
    titleStyles: titleVariant,
    descriptionStyles: descriptionVariant
  },
  {
    id: 5,
    title: 'cookiePolicyPage.TheCookiesWeSet.title',
    componentStyles: styles,
    titleStyles: titleVariant,
  },
  {
    id: 6,
    title: 'cookiePolicyPage.TheCookiesWeSet.Account.title',
    description: 'cookiePolicyPage.TheCookiesWeSet.Account.description',
    componentStyles: titleWithDotStyles,
    titleStyles:titleWithDotVariant,
    descriptionStyles: descriptionVariant
  },
  {
    id: 7,
    title: 'cookiePolicyPage.TheCookiesWeSet.Login.title',
    description: 'cookiePolicyPage.TheCookiesWeSet.Login.description',
    componentStyles: titleWithDotStyles,
    titleStyles:titleWithDotVariant,
    descriptionStyles: descriptionVariant
  },
  {
    id: 8,
    title: 'cookiePolicyPage.TheCookiesWeSet.Site.title',
    description: 'cookiePolicyPage.TheCookiesWeSet.Site.description',
    componentStyles: titleWithDotStyles,
    titleStyles:titleWithDotVariant,
    descriptionStyles: descriptionVariant
  },
  {
    id: 9,
    title: 'cookiePolicyPage.ThirdPartyCookies.title',
    description: 'cookiePolicyPage.ThirdPartyCookies.description',
    componentStyles: styles,
    titleStyles:titleVariant,
    descriptionStyles: descriptionVariant
  },
  {
    id: 10,
    title: 'cookiePolicyPage.ThirdPartyCookies.titleWithDot',
    componentStyles: titleWithDotStyles,
    titleStyles:titleWithDotVariant,
  },
  {
    id: 11,
    title: 'cookiePolicyPage.MoreInformation.title',
    componentStyles: styles,
    titleStyles:titleVariant
  },
  {
    id: 12,   
    title: 'cookiePolicyPage.MoreInformation.titleWithDot',
    componentStyles: titleWithDotStyles,
    titleStyles: titleWithDotVariant
  },
]
