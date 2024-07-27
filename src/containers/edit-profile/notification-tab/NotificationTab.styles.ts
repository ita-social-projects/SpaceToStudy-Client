import { TypographyVariantEnum } from '~/types'
import {
  innerContainer,
  rootContainer
} from '~/containers/edit-profile/common.styles'
import { switchStyle } from '~/containers/my-quizzes/quiz-settings-container/QuizSettingsContainer.styles'

export const styles = {
  root: { ...rootContainer, p: '24px 40px 40px 40px' },
  notificationInnerContainer: innerContainer,
  titleWithDescription: {
    title: {
      typography: TypographyVariantEnum.H6
    },
    description: {
      typography: TypographyVariantEnum.Body2,
      color: 'primary.500'
    }
  },
  options: {
    padding: '16px',
    mt: '0px'
  },
  switch: switchStyle
}
