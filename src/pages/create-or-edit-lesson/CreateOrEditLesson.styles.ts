import palette from '~/styles/app-theme/app.pallete'
import { VisibilityEnum } from '~/types'

const inputFontSize = {
  fontSize: '35px',
  fontWeight: 500,
  maxHeight: '35px',
  marginTop: 0
}

const titleAndDescription = {
  fontSize: '16px',
  maxHeight: '24px',
  marginTop: 0
}

const visibility = (value: string) => ({
  visibility: value ? VisibilityEnum.Hidden : VisibilityEnum.Visible,
  color: palette.primary[300]
})

export const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    p: { sm: '40px 36px', md: '40px 72px' }
  },

  input: {
    style: {
      padding: 0
    }
  },

  divider: {
    color: 'primary.300'
  },

  titleLabel: (value: string) => ({
    shrink: false,
    style: {
      top: -23,
      ...inputFontSize,
      ...visibility(value)
    }
  }),

  titleInput: {
    style: inputFontSize,
    disableUnderline: true
  },

  descriptionLabel: (value: string) => ({
    shrink: false,
    style: {
      top: -20,
      ...titleAndDescription,
      ...visibility(value)
    }
  }),

  descriptionInput: {
    style: titleAndDescription,
    disableUnderline: true
  },

  buttons: {
    alignSelf: { xs: 'center', sm: 'end' },
    display: 'flex',
    gap: { xs: '24px', sm: '30px' },
    justifyContent: 'space-between'
  },

  attachmentList: {
    container: {
      background: palette.basic.grey,
      borderRadius: '5px',
      p: '16px 24px',
      display: 'flex',
      justifyContent: 'space-between'
    }
  },

  addIcon: { width: { xs: '18px', sm: '22px' }, ml: '5px' },
  addAttachments: {
    width: 'fit-content'
  },

  button: { width: '250px' },
  newAttachmentIcon: {
    fontSize: '25px',
    marginLeft: '13px',
    fontWeight: '400'
  },

  addAttachmentBtn: { width: 'fit-content' },
  addAttachmentIcon: { ml: '5px', width: { xs: '18px', sm: '22px' } }
}
