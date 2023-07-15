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
      state.token = ''
    })
    builder.addCase(fetchLogin.rejected, (state) => {
      state.status = 'Error'
      state.token = ''

    })

    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.status = 'Done'
      state.token = action.payload.token
    })

    builder.addCase(reAuth.rejected, (state) => {
      state.status = 'Error'
    })

    builder.addCase(reAuth.fulfilled, (state, action) => {
      state.status = 'Done'
      state.token = action.payload.token
      
    })
  }
})
export { fetchIpTest }

export const { clearAuth } = authSlice.actions

export default authSlice.reducer
