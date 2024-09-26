import titleMd from '~/assets/img/guest-home-page/titleMd.svg'
import titleSm from '~/assets/img/guest-home-page/titleSm.svg'
import titleXs from '~/assets/img/guest-home-page/titleXs.svg'
import titleMdUk from '~/assets/img/guest-home-page/titleMdUk.svg'
import titleSmUk from '~/assets/img/guest-home-page/titleSmUk.svg'
import titleXsUk from '~/assets/img/guest-home-page/titleXsUk.svg'

export type DeviceType = 'isLaptopAndAbove' | 'isTablet' | 'isMobile'

export type Titles = {
  [key in DeviceType]: string
}

export const titles: Record<string, Titles> = {
  uk: {
    isLaptopAndAbove: titleMdUk,
    isTablet: titleSmUk,
    isMobile: titleXsUk
  },
  default: {
    isLaptopAndAbove: titleMd,
    isTablet: titleSm,
    isMobile: titleXs
  }
}
