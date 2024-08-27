export interface ProductPost {
  json: Partial<Product>;
  files: File[];
}
export interface Product {
  id: number;
  nome: string;
  descricao: string;
  valor_produto: number ;
  quantity: number ;
  desativado?: boolean;
  photos:string[],
  thumbnails:string[],
  produtoSubcategoria: ProdutoSubcategoria[];
  discount: number ;
  stock?:{quantity:number,colorId:number,sizeId:number}[]
}

export interface Category {
  id: number;
  data_criacao?: Date;
  categoria: string;
  descricao_categoria?: string;
  desativado?: boolean;
}
export interface ProductoColor {
  id?: number;
  descricao?: string;
  quantidade?: number;
}
export interface ProductoSize {
  id?: number;
  descricao?: string;
  quantidade?: number;
}

export interface ProdutoSubcategoria {
  id: number;
  data_criacao?: Date;
  subcategoria: string;
  descricao_subcategoria: string;
  desativado?: boolean;
  categoria?: Category
}
