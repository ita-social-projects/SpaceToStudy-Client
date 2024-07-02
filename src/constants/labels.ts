import { ProficiencyLevelEnum } from '~/types'

export const proficiencyLevelLabels: ReadonlyMap<ProficiencyLevelEnum, string> =
  new Map([
    [ProficiencyLevelEnum.Beginner, 'common.levels.beginner'],
    [ProficiencyLevelEnum.Intermediate, 'common.levels.intermediate'],
    [ProficiencyLevelEnum.Advanced, 'common.levels.advanced'],
    [ProficiencyLevelEnum.TestPreparation, 'common.levels.testPreparation'],
    [ProficiencyLevelEnum.Professional, 'common.levels.professional'],
    [ProficiencyLevelEnum.Specialized, 'common.levels.specialized']
  ])
