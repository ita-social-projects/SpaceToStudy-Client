import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { MenuItem, SxProps } from '@mui/material'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import CheckIcon from '@mui/icons-material/Check'
import appPallete from '~/styles/app-theme/app.pallete'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import EditIcon from '@mui/icons-material/Edit'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined'

import useMenu from '~/hooks/use-menu'
import IconTitleDescription from '~/components/icon-title-description/IconTitleDescription'
import AppChip from '~/components/app-chip/AppChip'

import { ColorEnum, TableActionFunc } from '~/types'
import { styles } from '~/components/question/Question.styles'
import { spliceSx } from '~/utils/helper-functions'
import { QuestionWithCategory } from '~/types/questions/questions.index'

interface QuestionProps extends QuestionWithCategory {
  sx?: SxProps
}

const Question: FC<QuestionProps> = ({ question, category, sx = {} }) => {
  const { t } = useTranslation()
  const { openMenu, renderMenu, closeMenu } = useMenu()

  const onAction = async (actionFunc: TableActionFunc) => {
    closeMenu()
    await actionFunc(question._id)
  }
  const rowActions = [
    {
      label: (
        <Box sx={styles.editIconWrapper}>
          <EditIcon sx={styles.editIcon} />
          {` ${t('common.edit')}`}
        </Box>
      ),
      func: (id: string) => {
        console.log('Edit', id)
      }
    },
    {
      label: (
        <Box sx={styles.deleteIconWrapper}>
          <DeleteOutlineIcon color='primary' sx={styles.deleteIcon} />
          {` ${t('common.delete')}`}
        </Box>
      ),
      func: (id: string) => {
        console.log('Delete', id)
      }
    }
  ]
  const menuItems = rowActions.map(({ label, func }) => (
    <MenuItem key={label} onClick={() => void onAction(func)}>
      {label}
    </MenuItem>
  ))

  const answersList = question.items.map((answer, i) => (
    <Box key={answer.text} sx={styles.answer}>
      <FormControlLabel
        checked={i == 1}
        control={<Checkbox />}
        label={answer.text}
      />
      {answer.isCorrect && (
        <CheckIcon sx={{ color: appPallete.basic.orientalHerbs }} />
      )}
    </Box>
  ))

  return (
    <Box sx={spliceSx(styles.root, sx)}>
      <Box sx={styles.dragIconWrapper}>
        <DragIndicatorIcon sx={styles.dragIcon} />
      </Box>
      <Box sx={styles.header}>
        <IconTitleDescription
          icon={
            <Box sx={styles.iconWrapper}>
              <LibraryAddCheckOutlinedIcon />
            </Box>
          }
          sx={styles.iconTitleDescription}
          title={question.title}
        />
        <IconButton onClick={openMenu}>
          <MoreVertIcon color={ColorEnum.Primary} sx={styles.moreIcon} />
        </IconButton>
        {renderMenu(menuItems)}
      </Box>
      <AppChip labelSx={styles.categoryChipLabel} sx={styles.categoryChip}>
        {category.name}
      </AppChip>

      <Divider />
      <Box sx={styles.questionBody}>
        <Typography sx={styles.questionText}>{question.text}</Typography>
        <Box sx={styles.answers}>{answersList}</Box>
      </Box>
    </Box>
  )
}

export default Question
