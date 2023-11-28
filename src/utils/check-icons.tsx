import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined'
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined'

import { types } from '~/constants'

export const CheckIcons = (type: string) => {
  return (
    (type === types.oneAnswer && <CheckCircleOutlineIcon />) ||
    (type === types.openAnswer && <DriveFileRenameOutlineOutlinedIcon />) ||
    (type === types.multipleChoice && <FormatListBulletedOutlinedIcon />)
  )
}
