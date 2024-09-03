import { ProficiencyLevelEnum, SortByEnum } from '~/types'

export const proficiencyLevelLabels: ReadonlyMap<ProficiencyLevelEnum, string> =
  new Map([
    [ProficiencyLevelEnum.Beginner, 'common.levels.Beginner'],
    [ProficiencyLevelEnum.Intermediate, 'common.levels.Intermediate'],
    [ProficiencyLevelEnum.Advanced, 'common.levels.Advanced'],
    [ProficiencyLevelEnum.TestPreparation, 'common.levels.TestPreparation'],
    [ProficiencyLevelEnum.Professional, 'common.levels.Professional'],
    [ProficiencyLevelEnum.Specialized, 'common.levels.Specialized']
  ])

export const SortByLabels: ReadonlyMap<SortByEnum, string> = new Map([
  [SortByEnum.Newest, 'userProfilePage.sortItems.Newest'],
  [SortByEnum.Relevant, 'userProfilePage.sortItems.Relevant'],
  [SortByEnum.highestRating, 'userProfilePage.sortItems.highestRating'],
  [SortByEnum.lowestRating, 'userProfilePage.sortItems.lowestRating']
])
