import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
  BaseQueryFn,
  FetchArgs
} from '@reduxjs/toolkit/query/react'
import { logout } from '../slices/logout'

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const {
      auth: { token }
    } = getState() as any
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
      console.log("🚀 ~ file: default.ts:19 ~ token:", token)
    }
    return headers
  }
})


const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
   if (result.error && result.error.status === 401) {
    console.log("entrou como erro")
    api.dispatch(logout())
  } 
  return result
}
export const defaultApi = createApi({
  reducerPath: 'defaultApi',
  tagTypes: ['Product','Categoria','Colors','Sizes'],
  keepUnusedDataFor: 240,
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({})
})

