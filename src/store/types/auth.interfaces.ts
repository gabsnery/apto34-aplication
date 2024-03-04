import { status } from '@types'


export interface Login {
  email: string
  senha?: string
  refreshToken?: string
}

export interface AuthState {
  id: number
  status: status
  admin?: boolean
  token: string;
  nome: string;
  sobrenome: string;
  email: string;
}
