import { FC, ChangeEvent } from 'react'
import { TextFieldProps } from '@mui/material/TextField'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import SendIcon from '@mui/icons-material/Send'

import AppTextArea from '~/components/app-text-area/AppTextArea'

import { styles } from '~/containers/chat/chat-text-area/ChatTextArea.styles'
import { TextFieldVariantEnum } from '~/types'

interface ChatTextAreaProps extends Omit<TextFieldProps, 'onChange'> {
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const ChatTextArea: FC<ChatTextAreaProps> = ({
  value,
  onChange,
  maxRows = 6,
  minRows = 1,
  ...props
}) => {
  return (
    <Box sx={styles.container}>
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
        sx={styles.textAreaWrapper}
        textFieldStyles={styles.textArea}
        value={value}
        variant={TextFieldVariantEnum.Standard}
        withHelperText={false}
        {...props}
      />
      <IconButton>
        <SendIcon sx={styles.icon} />
      </IconButton>
    </Box>
  )
}

export default ChatTextArea
