import { SortEnum, StepData, StepsEnum } from '../common.index'

export type Address = {
  country: string
  city: string
}

export type Category = {
  _id: string
  name: string
}

export type CreatedAt = {
  from: string
  to: string
}

export type LastLogin = {
  from: string
  to: string
}

export type Sort = {
  order: SortEnum
  orderBy: string
}

export type Country = {
  name: string
  iso2: string
}

export type FormInputValueChange<Value, Fields> = (
  id: string,
  field: keyof Fields,
  value: Value
) => void

export type FormNonInputValueChange<Value, Fields> = (
  key: keyof Fields,
  value: Value
) => void

export type UseFormEventHandler<Fields, Event> = (
  key: keyof Fields
) => (event: Event) => void

type FormValidationHandler<Data, Value> = (
  value: Value | string,
  data: Data
) => string | undefined

export type UseFormValidations<T> = {
  [Key in keyof T]: FormValidationHandler<T, T[Key]>
}

export type UseFormErrors<T> = Record<keyof T, string>

export type StepContextAction =
  | {
      type: StepsEnum.SetGeneralInfo
      payload: StepData['generalInfo']
    }
  | {
      type: StepsEnum.SetPhoto
      payload: StepData['photo']
    }
  | {
      type: StepsEnum.SetSubjects
      payload: StepData['subjects']
    }
  | {
      type: StepsEnum.SetLanguage
      payload: StepData['language']
    }

export type UpdatedPhoto = {
  src: string
  name: string
}
