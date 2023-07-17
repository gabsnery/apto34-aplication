import { useTypedSelector } from 'hooks'
import { FC, useEffect, useRef } from 'react'
import { Navigate, Outlet, PathRouteProps, Route, RouteProps, useLocation } from 'react-router-dom'
import Loading from './Loading'
import { reAuth } from "store/slices/auth.slice";
import store, { useAppDispatch } from 'store/store'
import { logout } from 'store/slices/logout'
export type PrivateRouteProps = RouteProps & {
  unprivate?: boolean
  both?: boolean
}

const PrivateRoute: FC<React.PropsWithChildren<PrivateRouteProps>> = (props) => {

  const {
    unprivate,
    both,
    ...routeProps
  } = props
  const token = useTypedSelector(({ auth }) => auth.token)

  return <Outlet />
}

export default PrivateRoute
