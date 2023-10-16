import {
  FC,
  ChangeEvent,
  useState,
  useRef,
  Dispatch,
  SetStateAction,
  MouseEvent
} from 'react'
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'
import { SxProps } from '@mui/material'
import { TextFieldProps } from '@mui/material/TextField'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import SendIcon from '@mui/icons-material/Send'
import MoodIcon from '@mui/icons-material/Mood'
import AttachFileIcon from '@mui/icons-material/AttachFile'

import useBreakpoints from '~/hooks/use-breakpoints'
import AppTextArea from '~/components/app-text-area/AppTextArea'

import { styles } from '~/containers/chat/chat-text-area/ChatTextArea.styles'
import { TextFieldVariantEnum } from '~/types'
import { spliceSx } from '~/utils/helper-functions'

interface ChatTextAreaProps extends Omit<TextFieldProps, 'onChange' | 'sx'> {
  value: string
  setValue: Dispatch<SetStateAction<string>>
  onClick: () => void
  sx?: {
    textAreaWrapper?: SxProps
    container?: SxProps
    icon?: SxProps
  }
  emojiPickerProps?: { perLine: number }
}

const ChatTextArea: FC<ChatTextAreaProps> = ({
  value,
  setValue,
  onClick,
  maxRows = 6,
  minRows = 1,
  sx = {},
  emojiPickerProps,
  ...props
}) => {
  const { isMobile } = useBreakpoints()
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value)

  const onEmojiSelect = ({ native: emoji }: { native: string }) => {
    if (inputRef.current) {
      const input = inputRef.current
      const start = input.selectionStart ?? 0

      setValue((prev) => {
        const updatedValue = prev.split('')
        updatedValue.splice(start, 0, emoji)
        return updatedValue.join('')
      })

      const newCursorPosition = start + emoji.length

      input.setSelectionRange(newCursorPosition, newCursorPosition)
      input.focus()
    }
  }

  const onTogglePicker = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setIsEmojiPickerOpen((prevState) => !prevState)
  }

  const onClosePicker = () => setIsEmojiPickerOpen(false)

  const endAdornment = (
    <>
      <IconButton onClick={onTogglePicker}>
        <MoodIcon />
      </IconButton>
      <IconButton disabled>
        <AttachFileIcon />
      </IconButton>
    </>
  )

  return (
    <Box sx={spliceSx(styles.container, sx.container)}>
      <Box sx={styles.testAreaWithPicker}>
        {isEmojiPickerOpen && (
          <Box data-testid='emoji-picker' sx={styles.emojiPicker}>
            <Picker
              data={data}
              emojiSize={20}
              maxFrequentRows={2}
              onClickOutside={onClosePicker}
              onEmojiSelect={onEmojiSelect}
              perLine={isMobile ? 6 : 8}
              previewPosition='none'
              searchPosition='none'
              skinTonePosition='none'
              {...emojiPickerProps}
            />
          </Box>
        )}

        <AppTextArea
          InputLabelProps={styles.textAreaLabel(value)}
          InputProps={{
            disableUnderline: true,
            endAdornment: endAdornment
          }}
          fullWidth
          inputRef={inputRef}
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
      </Box>

      <IconButton data-testid='send-btn' onClick={onClick}>
        <SendIcon sx={spliceSx(styles.icon, sx.icon)} />
      </IconButton>
    </Box>
  )
}

export default ChatTextArea
