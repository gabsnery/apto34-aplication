import { SessionFilter } from "store/types/sessionFilters.interfaces";
import { defaultApi } from "../default";
import { Product, ProductPost } from "./product.interface";
export const productApi = defaultApi.injectEndpoints({
    endpoints: (build) => ({

        updateAddProduct: build.mutation<Partial<Product>, ProductPost>({
            query: (payload) => {
                console.log("🚀 ~ file: index.tsx:8 ~ payload:", payload)
                const body = new FormData();
                body.append('json', JSON.stringify(payload.json));
                payload.files.forEach((file) => {
                    body.append('files', file);
                });
                console.log("🚀 ~ file: index.tsx:13 ~ payload.files.forEach ~ body:", body)
                return {
                    url: "api/product",
                    method: 'POST',
                    body: body,
                    formData: true
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
        getProducts: build.query<Product[], SessionFilter>({
            query: (filter) => `/api/product?${filter.category.map(item => `category[]=${item}`).join('&')}&${filter.size.map(item => `size[]=${item}`).join('&')}&${filter.color.map(item => `color[]=${item}`).join('&')}&${filter.type.map(item => `type[]=${item}`).join('&')}
            `,
            providesTags: ['Product']
        }),
        getProduct: build.query<Product, number>({
            query: (id) => `/api/product/${id}`
        }),
    }),
});
export const {
    useUpdateAddProductMutation,
    useDeleteProductMutation,
    useGetProductQuery, useGetProductsQuery } = productApi;
