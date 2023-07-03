export type status = 'NotAsked' | 'Pending' | 'Error' | 'Refreshing' | 'Done'

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type SaveResourcePayload<T extends { id: string }> = PartialBy<T, 'id'>

import { Dictionary } from '@reduxjs/toolkit'

export interface RequestError {
  name: 'RequestError' | 'NetworkError'
  status: number
  description?: string
  traceId?: string
  items?: Record<string, string[]>
}

export interface ReduxBaseState<T> {
  items: Dictionary<T>
  errors: Dictionary<RequestError>
  status: Dictionary<status>
  item?: T
}

export interface ReduxNonIndexedBaseState<T> {
  items: Array<T>
  errors: Dictionary<RequestError>
  status: Dictionary<status>
}

export interface TokenPayload {
  sub: string
  jti: string
  iat: number
  actort: string
  gender: string
  website: string
  nameid: string
  nbf: number
  exp: number
}

export interface DBLatLng {
  x: number
  y: number
}

export interface DBGeoreferencing {
  coordinates: {
    centroId?: DBLatLng
    points: Array<DBLatLng>
  }
}
