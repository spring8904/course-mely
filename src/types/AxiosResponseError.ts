import { AxiosError } from 'axios'

type ErrorResponse = {
  error: string
}

export type AxiosResponseError = AxiosError<ErrorResponse>
