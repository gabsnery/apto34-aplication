export interface NavObj {
  name: string
  disabled?: boolean
  link: string
  subItems?: Array<NavObj>
  condition?: (data: any) => boolean
}

const nav: NavObj[] = [
  {
    name: 'Store',
    link: '/store',
  }
]

export default nav
