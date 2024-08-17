import { Middleware } from '@reduxjs/toolkit'
import { GAevent } from 'utils'

const googleAnalyticsMiddleware: Middleware = () => (next) => (action) => {
  const actionType = action?.type.split('/')
  if (actionType[2] === 'fulfilled') {
        GAevent(actionType[1], actionType[0], JSON.stringify(action?.meta?.arg || ''))
  }

  return next(action)
}

export default googleAnalyticsMiddleware
