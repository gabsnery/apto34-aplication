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
  admin?: boolean
}

const PrivateRoute: FC<React.PropsWithChildren<PrivateRouteProps>> = (props) => {

  const {
    unprivate,
    both,
    admin,
    ...routeProps
  } = props
  const token = useTypedSelector(({ auth }) => auth.token)
  const isAdmin = useTypedSelector(({ auth }) => auth.admin)
  const status = useTypedSelector(({ auth }) => auth.status)
  const dispatch = useAppDispatch();

useEffect(() => {
  if(admin && token)
  dispatch(reAuth());
  
}, [admin]);

  if (both) {
    return <Outlet />
  }
  else if ((token) && (!admin || (admin && isAdmin))) { //logado
    if (unprivate) {
      return <Navigate to="/store" />
    }
    else
      return <Outlet />
  }
  else { //des-logado
    if (!unprivate)
      return <Navigate to="/login" />
    else
      return <Outlet />
  }
}

export default PrivateRoute
