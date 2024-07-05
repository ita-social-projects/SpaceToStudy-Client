import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import BiotechIcon from '@mui/icons-material/Biotech'
import ColorLensIcon from '@mui/icons-material/ColorLens'
import DesignServicesIcon from '@mui/icons-material/DesignServices'
import DesktopMacOutlinedIcon from '@mui/icons-material/DesktopMacOutlined'
import LanguageIcon from '@mui/icons-material/Language'
import LegendToggleIcon from '@mui/icons-material/LegendToggle'
import MusicNoteIcon from '@mui/icons-material/MusicNote'
import ScienceIcon from '@mui/icons-material/Science'
import StarIcon from '@mui/icons-material/Star'
import TagIcon from '@mui/icons-material/Tag'
import HistoryEduIcon from '@mui/icons-material/HistoryEdu'
import { SvgIconComponent } from '@mui/icons-material'

const CATEGORY_ICONS = {
  LanguageIcon,
  ColorLensIcon,
  BiotechIcon,
  DesktopMacOutlinedIcon,
  TagIcon,
  AccountBalanceIcon,
  StarIcon,
  DesignServicesIcon,
  MusicNoteIcon,
  ScienceIcon,
  LegendToggleIcon,
  HistoryEduIcon
} as const

type CategoryIconKey = keyof typeof CATEGORY_ICONS

export const getCategoryIcon = (iconName: string): SvgIconComponent =>
  CATEGORY_ICONS[iconName as CategoryIconKey] ?? CATEGORY_ICONS.LanguageIcon
