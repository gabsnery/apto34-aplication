import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit'
import { AuthState, Login } from '../types/auth.interfaces'

import { get, save } from '../../services/requests'
import { logout } from './logout'

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


export const initialState: AuthState = {
  status: 'NotAsked',
  token: '',
  admin: false
}


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuth: () => initialState
  },
  extraReducers(builder) {
    builder.addCase(fetchLogin.rejected, (state) => {
      state.status = 'Error'
      state.token = ''
      state.admin = false

    })

    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.status = 'Done'
      state.token = action.payload.token
      state.admin = action.payload.admin
    })
    builder.addCase(reAuth.rejected, (state) => {
      state.status = 'Error'
      state.token = ''
      state.admin = false

    })

    builder.addCase(reAuth.fulfilled, (state, action) => {
      state.status = 'Done'

    })
  }
})
export { fetchIpTest }

export const { clearAuth } = authSlice.actions

export default authSlice.reducer
