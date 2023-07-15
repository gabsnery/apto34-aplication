export interface Product {
  id?: number;
  nome: string;
  descricao: string;
  valor_produto: number ;
  desativado?: boolean;
  produtoSubcategoria: ProdutoSubcategoria[];
}

export interface Category {
  id?: number;
  data_criacao?: Date;
  categoria: string;
  descricao_categoria?: string;
  desativado?: boolean;
}

export interface ProdutoSubcategoria {
  id: number;
  data_criacao?: Date;
  subcategoria: string;
  descricao_subcategoria: string;
  desativado?: boolean;
  categoria?: Category
}
