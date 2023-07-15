import { defaultApi } from "../default";
import {  ProdutoSubcategoria } from "../product/product.interface";
export const categoryApi = defaultApi.injectEndpoints({
    endpoints: (build) => ({
        getCategorias: build.query<ProdutoSubcategoria[], void>({
            query: () => `/api/Subcategorias`,
            providesTags:['Categoria']
        }),
     
    }),
});
export const { 
     useGetCategoriasQuery } = categoryApi;
