import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined'
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined'

import { types } from '~/constants'

const typesArray: string[] = types

export const CheckIcons = (type: string) => {
  return (
    (type === typesArray[0] && <CheckCircleOutlineIcon />) ||
    (type === typesArray[1] && <DriveFileRenameOutlineOutlinedIcon />) ||
    (type === typesArray[2] && <FormatListBulletedOutlinedIcon />)
  )
}
