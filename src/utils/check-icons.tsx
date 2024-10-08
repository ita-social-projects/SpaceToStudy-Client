import ListIcon from '@mui/icons-material/CheckCircleOutline'
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined'
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined'

export const CheckIcons = (type: string) => {
  return (
    (type === 'oneAnswer' && <ListIcon />) ||
    (type === 'openAnswer' && <DriveFileRenameOutlineOutlinedIcon />) ||
    (type === 'multipleChoice' && <FormatListBulletedOutlinedIcon />)
  )
}
