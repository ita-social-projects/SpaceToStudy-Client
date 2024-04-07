import { TypographyVariantEnum } from '~/types'
import {
  rootContainer,
  updateProfileBtn
} from '~/containers/edit-profile/common.style'

const { Body2, H6 } = TypographyVariantEnum

export const styles = {
  root: {
    ...rootContainer
  },
  profileInnerContainer: {
    maxWidth: '768px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  headerTitleWithDesc: {
    wrapper: { textAlign: 'left' },
    title: { typography: H6 },
    description: { typography: Body2, color: 'primary.500' }
  },
  updateProfileBtn: {
    ...updateProfileBtn
  }
}
