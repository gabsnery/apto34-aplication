import { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import {store} from '../store'

const configAuthorizationHeader = async (config: InternalAxiosRequestConfig) => {
  const token = store.getState().auth?.token
  if (config.headers && token) config.headers['Authorization'] = `Bearer ${token}`

  return config
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

api.interceptors.request.use(configAuthorizationHeader)

export default api
