import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined'
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined'

import { QuestionTypesEnum } from '~/types'

export const CheckIcons = (type: string) => {
  return (
    (type === QuestionTypesEnum.OneAnswer && <CheckCircleOutlineIcon />) ||
    (type === QuestionTypesEnum.OpenAnswer && (
      <DriveFileRenameOutlineOutlinedIcon />
    )) ||
    (type === QuestionTypesEnum.MultipleChoice && (
      <FormatListBulletedOutlinedIcon />
    ))
  )
}
