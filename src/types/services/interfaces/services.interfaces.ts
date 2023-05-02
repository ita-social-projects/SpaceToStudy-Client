import { AxiosResponse } from 'axios'

export interface ServiceFunction<Response, Params = undefined> {
  (params?: Params): Promise<AxiosResponse<Response>>
}
