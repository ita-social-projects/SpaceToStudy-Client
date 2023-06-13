import { Params } from 'react-router-dom'
import { Crumbfunc } from './appBreadcrumbs.types'

export interface Crumb {
  name: string
  path?: string
}

export interface Matches {
  id: string
  pathname: string
  params: Params<string>
  data: unknown
  handle: {
    crumb: Crumb | Crumbfunc
  }
}
