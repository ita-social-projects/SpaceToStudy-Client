import { AxiosResponse } from 'axios'

export interface ServiceFunction<Response, Data> {
  (data?: Data): Promise<AxiosResponse<Response>>
}
