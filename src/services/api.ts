import { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import store from '../store/store'

const configAuthorizationHeader = async (config: InternalAxiosRequestConfig) => {
  const token = store.getState().auth?.token
  console.log("🚀 ~ file: api.ts:7 ~ configAuthorizationHeader ~ store.getState().auth:", store.getState().auth)
  console.log("🚀 ~ file: api.ts:7 ~ configAuthorizationHeader ~ token:", token)
  if (config.headers && token) config.headers['Authorization'] = `Bearer ${token}`

  return config
}

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})

api.interceptors.request.use(configAuthorizationHeader)

export default api
