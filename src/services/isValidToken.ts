import { isAfter, isBefore } from 'date-fns'

import { TokenPayload } from '@/@types'

function isTokenValid(payload: TokenPayload) {
  const exp = payload.exp * 1000
  const nbf = payload.nbf * 1000
  return isAfter(exp, new Date()) && isBefore(nbf, new Date())
}

export default isTokenValid
