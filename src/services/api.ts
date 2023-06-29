import { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import store from '../store/store'
import isValidToken from './isValidToken'

const configAuthorizationHeader = async (config: InternalAxiosRequestConfig) => {
  const token = store.getState().auth?.accessToken
  if (config.headers && token) config.headers['Authorization'] = `Bearer ${token}`

  return config
}

const api = axios.create({
  baseURL: process.env.VITE_REACT_APP_API_URL,
})

api.interceptors.request.use(configAuthorizationHeader)

export default api
