import TagRoundedIcon from '@mui/icons-material/TagRounded'
import ScienceRoundedIcon from '@mui/icons-material/ScienceRounded'
import CampaignIcon from '@mui/icons-material/Campaign'
import MusicNoteRoundedIcon from '@mui/icons-material/MusicNoteRounded'
import ColorLensRoundedIcon from '@mui/icons-material/ColorLensRounded'
import StackedBarChartIcon from '@mui/icons-material/StackedBarChart'
import LegendToggleRoundedIcon from '@mui/icons-material/LegendToggleRounded'
import LanguageIcon from '@mui/icons-material/Language'
import DesignServicesIcon from '@mui/icons-material/DesignServices'
import HistoryEduRoundedIcon from '@mui/icons-material/HistoryEduRounded'
import DesktopMacRoundedIcon from '@mui/icons-material/DesktopMacRounded'
import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded'
import StarRoundedIcon from '@mui/icons-material/StarRounded'

import { SvgIconComponent } from '@mui/icons-material'

const CATEGORY_ICONS = {
  LanguageIcon,
  DesignServicesIcon,
  TagRoundedIcon,
  ScienceRoundedIcon,
  CampaignIcon,
  MusicNoteRoundedIcon,
  ColorLensRoundedIcon,
  StackedBarChartIcon,
  LegendToggleRoundedIcon,
  HistoryEduRoundedIcon,
  DesktopMacRoundedIcon,
  AccountTreeRoundedIcon,
  StarRoundedIcon
} as const

type CategoryIconKey = keyof typeof CATEGORY_ICONS

export const getCategoryIcon = (iconName: string): SvgIconComponent =>
  CATEGORY_ICONS[iconName as CategoryIconKey] ?? CATEGORY_ICONS.LanguageIcon
