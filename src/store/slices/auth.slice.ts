import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit'
import { AuthState, Login } from '../types/auth.interfaces'

import { get, save } from '../../services/requests'

export const reAuth = createAsyncThunk(
  'auth/reAuth',
  async (loginData: Login) => await
    save<any>('login', {
      email: loginData.email,
      refreshToken : loginData.refreshToken,
      grantType: 'refresh_token',
    })
)
export const fetchLogin = createAsyncThunk(
  'auth/fetchLogin',
  async (loginData: Login) => await
    save<any>('login', {
      email: loginData.email,
      password: loginData.password,
      grantType: 'password',
    })
)

const fetchIpTest = createAsyncThunk('auth/test', async () =>
  get('api/user/ip')
)


export const initialState: AuthState = {
  status: 'NotAsked',
  accessToken: '',
  expiresIn: 0,
  userId: 0,
  email: '',
  name: '',
  cnpjcpf: '',
  cellphone: '',
  telephone: '',
  refreshToken: '',
  company: {
    Id: 0,
    Name: '',
    CNPJ: '',
    Active: false,
  },
  profiles: [],
  layers: [],
  framesbi: [],
  tools: []
}


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuth: () => initialState
  },
  extraReducers(builder) {
    builder.addCase(fetchLogin.pending, (state) => {
      state.status = 'Pending'
      state.accessToken = ''
      state.refreshToken = ''
      state.expiresIn = 0
      state.userId = 0
      state.email = ''
      state.name = ''
      state.cnpjcpf = ''
      state.cellphone = ''
      state.layers = []
      state.framesbi = []
      state.telephone = ''
      state.company = {
        Id: 0,
        Name: '',
        CNPJ: '',
        Active: false,
      }
    })
    builder.addCase(fetchLogin.rejected, (state) => {
      state.status = 'Error'
      state.accessToken = ''
      state.refreshToken = ''
      state.expiresIn = 0
      state.userId = 0
      state.email = ''
      state.name = ''
      state.cnpjcpf = ''
      state.cellphone = ''
      state.telephone = ''
      state.layers = []
      state.framesbi = []
      state.company = {
        Id: 0,
        Name: '',
        CNPJ: '',
        Active: false,
      }
    })

    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.status = 'Done'
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
      state.expiresIn = action.payload.expiresIn
      state.userId = action.payload.userId
      state.email = action.payload.email
      state.name = action.payload.name
      state.cnpjcpf = action.payload.cnpjcpf
      state.layers = action.payload.layers
      state.framesbi = action.payload.framesbi
      state.company = action.payload.company
      state.cellphone = action.payload.cellphone
      state.telephone = action.payload.telephone
    })

    builder.addCase(reAuth.rejected, (state) => {
      state.status = 'Error'
    })

    builder.addCase(reAuth.fulfilled, (state, action) => {
      state.status = 'Done'
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
      
    })
  }
})
export { fetchIpTest }

export const { clearAuth } = authSlice.actions

export default authSlice.reducer
