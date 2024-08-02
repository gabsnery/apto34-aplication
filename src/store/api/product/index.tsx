import { SessionFilter } from "store/types/sessionFilters.interfaces";
import { defaultApi } from "../default";
import { Product, ProductPost } from "./product.interface";
export const productApi = defaultApi.injectEndpoints({
  endpoints: (build) => ({
    updateAddProduct: build.mutation<Partial<Product>, ProductPost>({
      query: (payload) => {
        const body = new FormData();
        body.append("json", JSON.stringify(payload.json));
        payload.files.forEach((file) => {
          body.append("files", file);
        });
        return {
          url: "api/product",
          method: "POST",
          body: body,
          formData: true,
        };
      },
      invalidatesTags: ["Product"],
    }),
    deleteProduct: build.mutation<Product, Partial<Product>>({
      query: (payload) => {
        return {
          url: `api/product/${payload.id}`,
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        };
      },
      invalidatesTags: ["Product"],
    }),
    getProducts: build.query<
      Product[],
      SessionFilter & { start: number; count: number }
    >({
      query: (filter) => `/api/product/${filter.start}/${
        filter.count
      }?${filter.category
        .map((item) => `category[]=${item}`)
        .join("&")}&${filter.size
        .map((item) => `size[]=${item}`)
        .join("&")}&${filter.color
        .map((item) => `color[]=${item}`)
        .join("&")}&${filter.type.map((item) => `type[]=${item}`).join("&")}
            `,
      providesTags: ["Product"],
    }),
    getImage: build.query<{ url: string }, string>({
      query: (id) => `/api/product/image/${encodeURIComponent(id)}`,
    }),
    getProduct: build.query<Product, number>({
      query: (id) => `/api/product/${id}`,
    }),
    getProductImage: build.query<{ url: string }, string>({
      query: (id) => `/api/product/image/${encodeURIComponent(id)}`,
    }),
  }),
});
export const {
  useUpdateAddProductMutation,
  useDeleteProductMutation,
  useGetProductQuery,
  useGetImageQuery,
  useGetProductsQuery,
} = productApi;
