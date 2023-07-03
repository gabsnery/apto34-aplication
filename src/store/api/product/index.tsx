import { defaultApi } from "../default";
import {  Product } from "./product.interface";
export const productApi = defaultApi.injectEndpoints({
    endpoints: (build) => ({

        updateAddProduct: build.mutation<Product, Partial<Product>>({
            query: (payload) => {
                return {
                    url: "api/product",
                    method: payload.id ? 'PUT' : 'POST',
                    body: payload,
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                    },
                };
            },
            invalidatesTags: ['Product']

        }),
        deleteProduct: build.mutation<Product, Partial<Product>>({
            query: (payload) => {
                return {
                    url: `api/product/${payload.id}`,
                    method: 'DELETE',
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                    },
                };
            },
            invalidatesTags: ['Product']

        }),
        getProducts: build.query<Product[], void>({
            query: () => `/api/product`,
            providesTags:['Product']
        }),
        getProduct: build.query<Product, number>({
            query: (id) => `/api/product/${id}`
        }),
    }),
});
export const { 
    useUpdateAddProductMutation,
    useDeleteProductMutation,
    useGetProductQuery,  useGetProductsQuery } = productApi;
