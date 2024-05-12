import { TypographyVariantEnum } from '~/types'
import {
  innerContainer,
  rootContainer,
  updateProfileBtn
} from '~/containers/edit-profile/common.styles'
import { switchStyle } from '~/containers/my-quizzes/quiz-settings-container/QuizSettingsContainer.styles'

export const styles = {
  root: rootContainer,
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
  optionsContainer: {
    padding: '10px 10px 30px'
  },
  options: {
    border: '1px solid',
    borderColor: 'basic.gray',
    borderRadius: '5px',
    padding: '15px',
    mt: '-1px'
  },
  switch: switchStyle,
  updateProfileBtn
}
