import { defaultApi } from "../default";
import {  ProdutoSubcategoria,Category } from "../product/product.interface";
export const categoryApi = defaultApi.injectEndpoints({
    endpoints: (build) => ({
        getSubCategorias: build.query<ProdutoSubcategoria[], void>({
            query: () => `/api/Subcategorias`,
            providesTags:['Categoria']
        }),
        getCategorias: build.query<Category[], void>({
            query: () => `/api/category`,
            providesTags:['Categoria']
        }),
     
    }),
});
export const { 
     useGetSubCategoriasQuery,
     useGetCategoriasQuery
     } = categoryApi;
