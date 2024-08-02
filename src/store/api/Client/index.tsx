import { IClient } from "store/types/auth.interfaces";
import { defaultApi } from "../default";
import {  ProdutoSubcategoria,Category } from "../product/product.interface";
export const clientAPI = defaultApi.injectEndpoints({
    endpoints: (build) => ({
        addClient: build.mutation<Partial<IClient>, Partial<IClient>>({
            query: (payload) => {
              return {
                url: `api/client`,
                method: "POST",
                body: payload,
                headers: {
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": "*",
                },
              };
            },
            invalidatesTags: ["Client"],
          }),
     
    }),
});
export const { 
     useAddClientMutation
     } = clientAPI;
