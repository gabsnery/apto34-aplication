import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
  BaseQueryFn,
  FetchArgs
} from '@reduxjs/toolkit/query/react'
import { logout } from '../slices/logout'

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const {
      auth: { token }
    } = getState() as any
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
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
    api.dispatch(logout())
  } 
  return result
}
export const defaultApi = createApi({
  reducerPath: 'defaultApi',
  tagTypes: ['Product','Categoria','Colors','Sizes','Banner','Client'],
  keepUnusedDataFor: 240,
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({})
})

