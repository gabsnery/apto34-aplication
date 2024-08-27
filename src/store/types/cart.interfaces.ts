import { status } from '@types'
import { Product } from 'store/api/product/product.interface'


export interface OrderItem {
  product: Product
  idSize:number
  idColor:number
  quantity: number
}
export interface Order {
  items: OrderItem[]
  total: number
}
