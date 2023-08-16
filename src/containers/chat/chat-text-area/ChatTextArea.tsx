import { FC, ChangeEvent } from 'react'
import { TextFieldProps } from '@mui/material/TextField'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import SendIcon from '@mui/icons-material/Send'

import AppTextArea from '~/components/app-text-area/AppTextArea'

import { styles } from '~/containers/chat/chat-text-area/ChatTextArea.styles'
import { TextAreaSx, TextFieldVariantEnum } from '~/types'
import { spliceSx } from '~/utils/helper-functions'

interface ChatTextAreaProps extends Omit<TextFieldProps, 'onChange' | 'sx'> {
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onClick: () => void
  sx?: TextAreaSx
}

const ChatTextArea: FC<ChatTextAreaProps> = ({
  value,
  onChange,
  onClick,
  maxRows = 6,
  minRows = 1,
  sx = {},
  ...props
}) => {
  return (
    <Box sx={spliceSx(styles.container, sx.container)}>
      <AppTextArea
        InputLabelProps={{
          style: styles.textAreaLabel(value),
          shrink: false
        }}
        InputProps={{ disableUnderline: true }}
        fullWidth
        maxRows={maxRows}
        minRows={minRows}
        onChange={onChange}
        sx={spliceSx(styles.textAreaWrapper, sx.textAreaWrapper)}
        textFieldStyles={styles.textArea}
        value={value}
        variant={TextFieldVariantEnum.Standard}
        withHelperText={false}
        {...props}
      />
      <IconButton data-testid='send-btn' onClick={onClick}>
        <SendIcon sx={spliceSx(styles.icon, sx.icon)} />
      </IconButton>
    </Box>
  )
}

export default ChatTextArea
