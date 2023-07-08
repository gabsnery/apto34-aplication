import { status } from '@types'
import { Product } from 'store/api/product/product.interface'


export interface SessionFilter {
  category?:number[]
  tags?: number[]
  size?:number[]
  color?:number[]
}
