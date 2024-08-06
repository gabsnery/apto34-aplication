export interface NavObj {
  name: string
  disabled?: boolean
  link: string
  subItems?: Array<NavObj>
  condition?: (data: any) => boolean
}

const nav: NavObj[] = [
  {
    name: 'home',
    link: '/',
  },
  {
    name: 'store',
    link: '/store',
  },
  {
    name: 'about_us',
    link: '/aboutUs',
  }
]

export default nav
