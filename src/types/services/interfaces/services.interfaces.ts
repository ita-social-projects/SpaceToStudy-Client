import { AxiosResponse } from 'axios'

export interface ServiceFunction<Response, Params> {
  (params?: Params): Promise<AxiosResponse<Response>>
}
