import { defaultApi } from "../default";
export interface Color {
    id: number;
    descricao?: string;
  }
  
export const colorApi = defaultApi.injectEndpoints({
    endpoints: (build) => ({
        getColors: build.query<Color[], void>({
            query: () => `/api/color`,
            providesTags:['Colors']
        }),
     
    }),
});
export const { 
     useGetColorsQuery } = colorApi;
