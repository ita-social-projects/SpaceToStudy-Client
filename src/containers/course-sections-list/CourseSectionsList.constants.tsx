import Crop75Icon from '@mui/icons-material/Crop75'
import { styles } from '~/containers/course-sections-list/CourseSectionsList.styles'
import ViewComfyOutlinedIcon from '@mui/icons-material/ViewComfyOutlined'

export const addActivityMenuItems = [
  {
    id: 1,
    label: 'cooperationsPage.manyTypes.module',
    icon: <Crop75Icon sx={styles.menuIcon} />
  },
  {
    id: 2,
    label: 'cooperationsPage.manyTypes.courseTemplate',
    icon: <ViewComfyOutlinedIcon sx={styles.menuIcon} />
  }
]
