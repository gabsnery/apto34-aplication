export interface Product {
  id: number;
  name: string;
  value: number;
  description: string;
  picture: string;
  categories?: any[];
  sizes?: any[];
  color?: any[];
}
