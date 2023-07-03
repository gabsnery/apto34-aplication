import axios from 'axios'
import { SaveResourcePayload } from '@types'
import api from '../api'
import { createRequestError } from 'utils'

export const get = async <E>(
  endpoint: string,
  options: Partial<E> | undefined = undefined
) => {
  try {
    const { data } = await api.get(endpoint, {
      params: options
    })
    return data
  } catch (error) {
    if (axios.isAxiosError(error)) throw createRequestError(error)
  }
}

export const save = async <E extends { id: string }>(
  endpoint: string,
  body: SaveResourcePayload<E>
) => {
  try {
    const { data } = await api.post(endpoint, body)

    return data
  } catch (error) {
    if (axios.isAxiosError(error)) throw (error.response?.data)
  }
}

export const update = async <E>(
  endpoint: string,
  body: E,
  options: Partial<E> | undefined = undefined
) => {
  try {
    const { data } = await api.put(endpoint, body, { params: options })

    return data
  } catch (error) {
    if (axios.isAxiosError(error)) throw createRequestError(error)
  }
}

export const del = async (endpoint: string) => {
  try {
    const { data } = await api.delete(endpoint)

    return data
  } catch (error) {
    if (axios.isAxiosError(error)) throw createRequestError(error)
  }
}
