import { defaultApi } from "../default";
export interface Size {
    id: number;
    descricao?: string;
  }
  
export const sizeApi = defaultApi.injectEndpoints({
    endpoints: (build) => ({
        getSizes: build.query<Size[], void>({
            query: () => `/api/sizes`,
            providesTags:['Sizes']
        }),
     
    }),
});
export const { 
     useGetSizesQuery } = sizeApi;
