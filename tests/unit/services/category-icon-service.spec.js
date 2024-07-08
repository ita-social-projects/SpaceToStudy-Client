import { vi } from 'vitest'
import { getCategoryIcon } from '~/services/category-icon-service'

vi.mock('@mui/icons-material/Language', () => ({
  default: 'LanguageIcon'
}))

vi.mock('@mui/icons-material/ColorLensRounded', () => ({
  default: 'ColorLensRoundedIcon'
}))

vi.mock('@mui/icons-material/ScienceRounded', () => ({
  default: 'ScienceRoundedIcon'
}))

vi.mock('@mui/icons-material/DesktopMacRounded', () => ({
  default: 'DesktopMacRoundedIcon'
}))

vi.mock('@mui/icons-material/TagRounded', () => ({
  default: 'TagRoundedIcon'
}))

vi.mock('@mui/icons-material/AccountTreeRounded', () => ({
  default: 'AccountTreeRoundedIcon'
}))

vi.mock('@mui/icons-material/StarRounded', () => ({
  default: 'StarRoundedIcon'
}))

vi.mock('@mui/icons-material/DesignServices', () => ({
  default: 'DesignServicesIcon'
}))

vi.mock('@mui/icons-material/MusicNoteRounded', () => ({
  default: 'MusicNoteRoundedIcon'
}))

vi.mock('@mui/icons-material/StackedBarChart', () => ({
  default: 'StackedBarChartIcon'
}))

vi.mock('@mui/icons-material/LegendToggleRounded', () => ({
  default: 'LegendToggleRoundedIcon'
}))

vi.mock('@mui/icons-material/HistoryEduRounded', () => ({
  default: 'HistoryEduRoundedIcon'
}))

vi.mock('@mui/icons-material/Campaign', () => ({
  default: 'CampaignIcon'
}))

const iconNames = [
  'LanguageIcon',
  'ColorLensRoundedIcon',
  'ScienceRoundedIcon',
  'DesktopMacRoundedIcon',
  'TagRoundedIcon',
  'AccountTreeRoundedIcon',
  'StarRoundedIcon',
  'DesignServicesIcon',
  'MusicNoteRoundedIcon',
  'StackedBarChartIcon',
  'LegendToggleRoundedIcon',
  'HistoryEduRoundedIcon',
  'CampaignIcon'
]

describe('categoryIconService test', () => {
  it('should return icons', () => {
    iconNames.forEach((iconName) => {
      const icon = getCategoryIcon(iconName)
      expect(icon).toEqual(iconName)
    })
  })

  it('should return LanguageIcon for invalid icon name', () => {
    const icon = getCategoryIcon('InvalidIcon')
    expect(icon).toEqual('LanguageIcon')
  })
})
