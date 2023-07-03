import { AxiosError } from 'axios'
import { RequestError } from '@types'

function createRequestError(e: AxiosError): RequestError {
  if (e.response) {
    const { data, status } = e.response

    return {
      name: 'RequestError',
      status,
      description: ((data as string) || undefined) ?? '',
    }
  } else if (e.request) {
    return {
      name: 'RequestError',
      status: e.request.status,
      description: e.request.response,
    }
  } else
    return {
      name: 'NetworkError',
      status: 0,
    }
}

export default createRequestError
