import { ProficiencyLevelEnum, SortByEnum } from '~/types'

export const proficiencyLevelLabels: ReadonlyMap<ProficiencyLevelEnum, string> =
  new Map([
    [ProficiencyLevelEnum.Beginner, 'common.levels.beginner'],
    [ProficiencyLevelEnum.Intermediate, 'common.levels.intermediate'],
    [ProficiencyLevelEnum.Advanced, 'common.levels.advanced'],
    [ProficiencyLevelEnum.TestPreparation, 'common.levels.testPreparation'],
    [ProficiencyLevelEnum.Professional, 'common.levels.professional'],
    [ProficiencyLevelEnum.Specialized, 'common.levels.specialized']
  ])

export const SortByLabels: ReadonlyMap<SortByEnum, string> = new Map([
  [SortByEnum.Newest, 'userProfilePage.sortItems.Newest'],
  [SortByEnum.Relevant, 'userProfilePage.sortItems.Relevant'],
  [SortByEnum.highestRating, 'userProfilePage.sortItems.highestRating'],
  [SortByEnum.lowestRating, 'userProfilePage.sortItems.lowestRating']
])
