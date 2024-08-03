import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit'
import { IClient, Login } from '../types/auth.interfaces'

import { get, save } from '../../services/requests'

export const reAuth = createAsyncThunk(
  'auth/reAuth',
  async () => await
    save<any>('welcome', {})
)
export const fetchLogin = createAsyncThunk(
  'auth/fetchLogin',
  async (loginData: Login) => await
    save<any>('login', {
      email: loginData.email,
      senha: loginData.senha,
      grantType: 'password',
    })
)

const fetchIpTest = createAsyncThunk('auth/test', async () =>
  get('api/user/ip')
)


export const initialState: IClient = {
  id:0,
  status: 'NotAsked',
  token: '',
  admin: false,
  nome: '',
  sobrenome: '',
  email: ''
}


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuth: () => initialState
  },
  extraReducers(builder) {
    builder.addCase(fetchLogin.rejected, (state) => {
      state.id=0
      state.status = 'Error'
      state.token = ''
      state.admin = false
      state.nome = ''
      state.sobrenome = ''
      state.email = ''
    })

    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.status = 'Done'
      state.id=action.payload.id
      state.token = action.payload.token
      state.admin = action.payload.admin
      state.nome = action.payload.nome
      state.sobrenome = action.payload.sobrenome
      state.email = action.payload.email
    })
    builder.addCase(reAuth.rejected, (state) => {
      state.id=0
      state.status = 'Error'
      state.token = ''
      state.admin = false
      state.nome = ''
      state.sobrenome = ''
      state.email = ''
    })

    builder.addCase(reAuth.fulfilled, (state, action) => {
      state.status = 'Done'

    })
  }
})
export { fetchIpTest }

export const { clearAuth } = authSlice.actions

export default authSlice.reducer
