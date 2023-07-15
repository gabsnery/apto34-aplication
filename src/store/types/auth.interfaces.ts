import { status } from '@types'


export interface Login {
  email: string
  senha?: string
  refreshToken?: string
}

export interface AuthState {
  status: status
  token:  string;
}
