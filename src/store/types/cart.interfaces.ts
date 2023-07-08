import { status } from '@types'
import { Product } from 'store/api/product/product.interface'


export interface OrderItem {
  product: Product
  quantity: number
}
export interface Order {
  items: OrderItem[]
  total: number
}
